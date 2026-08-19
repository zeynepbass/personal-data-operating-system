[CmdletBinding()]
param(
    [switch]$Reinstall,

    [Alias("h", "help")]
    [switch]$ShowHelp
)

$ErrorActionPreference = "Stop"
$RootDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ClientDir = Join-Path $RootDir "client"
$ServerDir = Join-Path $RootDir "server"

function Show-Usage {
    Write-Host @"
Kullanim: powershell -ExecutionPolicy Bypass -File .\start.ps1 [-Reinstall] [-ShowHelp]

  -Reinstall  Bagimliliklari yeniden kurar ve ortam ayarlarini yeniden sorar.
  -ShowHelp   Bu yardim metnini gosterir.
"@
}

if ($ShowHelp) {
    Show-Usage
    exit 0
}

if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Error "npm bulunamadi. Once Node.js 20.9 veya uzerini kurun: https://nodejs.org/"
}

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Error "node bulunamadi. Node.js 20.9 veya uzerini kurun."
}

function Test-EnvKey {
    param(
        [string]$Path,
        [string]$Key
    )

    if (-not (Test-Path -LiteralPath $Path -PathType Leaf)) {
        return $false
    }

    return [bool](Select-String -LiteralPath $Path -Pattern "^\s*$([regex]::Escape($Key))=.+" -Quiet)
}

function Test-PdosInstalled {
    return (
        (Test-Path -LiteralPath (Join-Path $ClientDir "node_modules") -PathType Container) -and
        (Test-Path -LiteralPath (Join-Path $ServerDir "node_modules") -PathType Container) -and
        (Test-EnvKey (Join-Path $ClientDir ".env") "NEXT_PUBLIC_API_URI") -and
        (Test-EnvKey (Join-Path $ServerDir ".env") "PORT") -and
        (Test-EnvKey (Join-Path $ServerDir ".env") "MONGO_URI") -and
        (Test-EnvKey (Join-Path $ServerDir ".env") "JWT_SECRET")
    )
}

function Read-WithDefault {
    param(
        [string]$Prompt,
        [string]$DefaultValue
    )

    $answer = Read-Host "$Prompt [$DefaultValue]"
    if ([string]::IsNullOrWhiteSpace($answer)) {
        return $DefaultValue
    }
    return $answer
}

function New-JwtSecret {
    $bytes = New-Object byte[] 48
    $generator = [System.Security.Cryptography.RandomNumberGenerator]::Create()
    try {
        $generator.GetBytes($bytes)
    }
    finally {
        $generator.Dispose()
    }
    return ([System.BitConverter]::ToString($bytes)).Replace("-", "").ToLowerInvariant()
}

function Write-Utf8NoBom {
    param(
        [string]$Path,
        [string]$Content
    )

    $encoding = New-Object System.Text.UTF8Encoding($false)
    [System.IO.File]::WriteAllText($Path, $Content, $encoding)
}

function Set-EnvValue {
    param(
        [string]$Path,
        [string]$Key,
        [string]$Value
    )

    $lines = if (Test-Path -LiteralPath $Path) { @(Get-Content -LiteralPath $Path) } else { @() }
    $updated = $false
    $newLines = foreach ($line in $lines) {
        if ($line -match "^$([regex]::Escape($Key))=") {
            "$Key=$Value"
            $updated = $true
        }
        else {
            $line
        }
    }
    if (-not $updated) { $newLines += "$Key=$Value" }
    Write-Utf8NoBom $Path (($newLines -join "`n") + "`n")
}

function Get-PortProcesses {
    param([int]$Port)
    return @(Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue)
}

function Find-NextAvailablePort {
    param([int]$Port)
    $candidate = $Port + 1
    while ((Get-PortProcesses $candidate).Count -gt 0) { $candidate++ }
    return $candidate
}

function Confirm-PortAvailable {
    param(
        [int]$Port,
        [string]$Label
    )

    $connections = @(Get-PortProcesses $Port)
    if ($connections.Count -eq 0) {
        return $Port
    }

    $processIds = @($connections | Select-Object -ExpandProperty OwningProcess -Unique)
    $processDescriptions = foreach ($processId in $processIds) {
        $process = Get-Process -Id $processId -ErrorAction SilentlyContinue
        if ($process) { "$($process.ProcessName) (PID $processId)" } else { "PID $processId" }
    }

    Write-Host "$Label portu ($Port) zaten kullanimda: $($processDescriptions -join ', ')"
    $answer = Read-Host "Bu portu kullanan surec kapatilsin mi? [e/H]"
    if ($answer -notmatch '^[EeYy]$') {
        $alternativeAnswer = Read-Host "Alternatif bir port kullanilsin mi? [E/h]"
        if ([string]::IsNullOrWhiteSpace($alternativeAnswer)) { $alternativeAnswer = "E" }
        if ($alternativeAnswer -notmatch '^[EeYy]$') {
            Write-Host "Baslatma iptal edildi; calisan sureclere dokunulmadi."
            return $null
        }

        $suggestedPort = Find-NextAvailablePort $Port
        while ($true) {
            $requestedPortText = Read-WithDefault "Kullanilacak alternatif $Label portu" "$suggestedPort"
            $requestedPort = 0
            if (-not [int]::TryParse($requestedPortText, [ref]$requestedPort) -or $requestedPort -lt 1 -or $requestedPort -gt 65535) {
                Write-Host "Gecersiz port. 1-65535 arasinda bir sayi girin."
                continue
            }
            if ((Get-PortProcesses $requestedPort).Count -gt 0) {
                Write-Host "$requestedPort portu da kullanimda; baska bir port secin."
                continue
            }
            Write-Host "$Label icin $requestedPort portu secildi."
            return $requestedPort
        }
    }

    foreach ($processId in $processIds) {
        Stop-Process -Id $processId -Force -ErrorAction Stop
    }
    Start-Sleep -Seconds 1

    if ((Get-PortProcesses $Port).Count -gt 0) {
        Write-Error "$Port portu bosaltilamadi."
    }

    Write-Host "$Port portu bosaltildi."
    return $Port
}

function Set-PdosConfiguration {
    Write-Host ""
    Write-Host "Ortam ayarlari (deger girmeden Enter'a basarsaniz varsayilan kullanilir):"

    $mongoUri = Read-WithDefault "MongoDB baglanti adresi" "mongodb://127.0.0.1:27017/pdos"
    $backendPort = Read-WithDefault "Backend portu" "6021"
    $frontendPort = Read-WithDefault "Frontend portu" "3000"
    $apiUri = Read-WithDefault "Frontend API adresi" "http://localhost:$backendPort/api"
    $jwtSecret = New-JwtSecret

    $serverEnv = "PORT=$backendPort`nMONGO_URI=$mongoUri`nJWT_SECRET=$jwtSecret`n"
    $clientEnv = "NEXT_PUBLIC_API_URI=$apiUri`nPORT=$frontendPort`n"

    Write-Utf8NoBom (Join-Path $ServerDir ".env") $serverEnv
    Write-Utf8NoBom (Join-Path $ClientDir ".env") $clientEnv
    Write-Host "Ortam dosyalari olusturuldu; JWT anahtari guvenli ve rastgele uretildi."
}

if ($Reinstall -or -not (Test-PdosInstalled)) {
    if ($Reinstall) {
        Write-Host "Yeniden kurulum baslatiliyor..."
    }
    else {
        Write-Host "Ilk kurulum baslatiliyor..."
    }

    Write-Host "Backend paketleri kuruluyor..."
    Push-Location $ServerDir
    try { & npm install } finally { Pop-Location }
    if ($LASTEXITCODE -ne 0) { throw "Backend paket kurulumu basarisiz oldu." }

    Write-Host "Frontend paketleri kuruluyor..."
    Push-Location $ClientDir
    try { & npm install } finally { Pop-Location }
    if ($LASTEXITCODE -ne 0) { throw "Frontend paket kurulumu basarisiz oldu." }

    Set-PdosConfiguration
    Write-Host "Kurulum tamamlandi."
}
else {
    Write-Host "PDOS zaten kurulu; kurulum adimlari atlandi."
}

$runAnswer = Read-Host "Uygulama simdi calistirilsin mi? [E/h]"
if ([string]::IsNullOrWhiteSpace($runAnswer)) { $runAnswer = "E" }

if ($runAnswer -match '^[EeYy]$') {
    $frontendPortLine = Select-String -LiteralPath (Join-Path $ClientDir ".env") -Pattern '^PORT=(.+)$' | Select-Object -Last 1
    $frontendPort = if ($frontendPortLine) { $frontendPortLine.Matches[0].Groups[1].Value } else { "3000" }
    $apiUriLine = Select-String -LiteralPath (Join-Path $ClientDir ".env") -Pattern '^NEXT_PUBLIC_API_URI=(.+)$' | Select-Object -Last 1
    $apiUri = if ($apiUriLine) { $apiUriLine.Matches[0].Groups[1].Value } else { "http://localhost:6021/api" }
    $backendPortLine = Select-String -LiteralPath (Join-Path $ServerDir ".env") -Pattern '^PORT=(.+)$' | Select-Object -Last 1
    $backendPort = if ($backendPortLine) { $backendPortLine.Matches[0].Groups[1].Value } else { "6021" }
    $frontendUrl = "http://localhost:$frontendPort"

    $selectedFrontendPort = Confirm-PortAvailable ([int]$frontendPort) "Frontend"
    if ($null -eq $selectedFrontendPort) { exit 1 }
    if ($selectedFrontendPort -ne [int]$frontendPort) {
        $frontendPort = "$selectedFrontendPort"
        Set-EnvValue (Join-Path $ClientDir ".env") "PORT" $frontendPort
    }

    $selectedBackendPort = Confirm-PortAvailable ([int]$backendPort) "Backend"
    if ($null -eq $selectedBackendPort) { exit 1 }
    if ($selectedBackendPort -ne [int]$backendPort) {
        $backendPort = "$selectedBackendPort"
        $apiUri = "http://localhost:$backendPort/api"
        Set-EnvValue (Join-Path $ServerDir ".env") "PORT" $backendPort
        Set-EnvValue (Join-Path $ClientDir ".env") "NEXT_PUBLIC_API_URI" $apiUri
    }

    $frontendUrl = "http://localhost:$frontendPort"

    Write-Host "Backend ve frontend baslatiliyor. Durdurmak icin Ctrl+C kullanin."
    Write-Host ""
    Write-Host "Frontend  : $frontendUrl"
    Write-Host "Giris     : $frontendUrl/login"
    Write-Host "Backend API: $apiUri"
    Write-Host ""
    $serverProcess = Start-Process -FilePath "npm.cmd" -ArgumentList @("run", "dev") -WorkingDirectory $ServerDir -NoNewWindow -PassThru
    $clientProcess = Start-Process -FilePath "npm.cmd" -ArgumentList @("run", "dev", "--", "--port", $frontendPort) -WorkingDirectory $ClientDir -NoNewWindow -PassThru

    try {
        Wait-Process -Id $serverProcess.Id, $clientProcess.Id
    }
    finally {
        foreach ($process in @($serverProcess, $clientProcess)) {
            if (-not $process.HasExited) {
                Stop-Process -Id $process.Id -Force -ErrorAction SilentlyContinue
            }
        }
    }
}
else {
    Write-Host "Kurulum hazir. Daha sonra baslatmak icin: powershell -ExecutionPolicy Bypass -File .\start.ps1"
}
