#!/usr/bin/env bash

set -Eeuo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CLIENT_DIR="$ROOT_DIR/client"
SERVER_DIR="$ROOT_DIR/server"
REINSTALL=false

usage() {
  cat <<'EOF'
Kullanım: bash ./start.sh [--reinstall] [--help]

  --reinstall  Bağımlılıkları yeniden kurar ve ortam ayarlarını yeniden sorar.
  --help       Bu yardım metnini gösterir.
EOF
}

for argument in "$@"; do
  case "$argument" in
    --reinstall) REINSTALL=true ;;
    --help|-h) usage; exit 0 ;;
    *) echo "Bilinmeyen seçenek: $argument" >&2; usage >&2; exit 1 ;;
  esac
done

if ! command -v npm >/dev/null 2>&1; then
  echo "Hata: npm bulunamadı. Önce Node.js 20.9 veya üzerini kurun: https://nodejs.org/" >&2
  exit 1
fi

if ! command -v node >/dev/null 2>&1; then
  echo "Hata: node bulunamadı. Node.js 20.9 veya üzerini kurun." >&2
  exit 1
fi

has_env_key() {
  local file="$1"
  local key="$2"
  [[ -f "$file" ]] && grep -Eq "^[[:space:]]*${key}=.+" "$file"
}

get_env_value() {
  local file="$1"
  local key="$2"

  [[ -f "$file" ]] || return 0
  awk -v key="$key" '
    index($0, key "=") == 1 { value = substr($0, length(key) + 2) }
    END { print value }
  ' "$file"
}

set_env_value() {
  local file="$1"
  local key="$2"
  local value="$3"
  local temp_file

  temp_file="$(mktemp "${file}.tmp.XXXXXX")"
  awk -v key="$key" -v value="$value" '
    BEGIN { updated = 0 }
    index($0, key "=") == 1 { print key "=" value; updated = 1; next }
    { print }
    END { if (!updated) print key "=" value }
  ' "$file" > "$temp_file"
  mv "$temp_file" "$file"
}

is_installed() {
  [[ -d "$CLIENT_DIR/node_modules" ]] &&
    [[ -d "$SERVER_DIR/node_modules" ]] &&
    has_env_key "$CLIENT_DIR/.env" "NEXT_PUBLIC_API_URI" &&
    has_env_key "$SERVER_DIR/.env" "PORT" &&
    has_env_key "$SERVER_DIR/.env" "MONGO_URI" &&
    has_env_key "$SERVER_DIR/.env" "JWT_SECRET"
}

prompt_with_default() {
  local prompt="$1"
  local default_value="$2"
  local answer

  read -r -p "$prompt [$default_value]: " answer || true
  printf '%s' "${answer:-$default_value}"
}

get_port_pids() {
  local port="$1"

  case "${OSTYPE:-}" in
    msys*|mingw*|cygwin*)
      netstat -ano 2>/dev/null |
        awk -v port="$port" '$1 ~ /^TCP/ && $2 ~ (":" port "$") && $4 == "LISTENING" { print $5 }' |
        sort -u
      ;;
    *)
      if command -v lsof >/dev/null 2>&1; then
        lsof -nP -tiTCP:"$port" -sTCP:LISTEN 2>/dev/null || true
      elif command -v ss >/dev/null 2>&1; then
        ss -ltnp "sport = :$port" 2>/dev/null |
          awk -F'pid=' 'NR > 1 && NF > 1 { split($2, part, ","); print part[1] }' |
          sort -u
      fi
      ;;
  esac
}

ensure_port_available() {
  local port="$1"
  local label="$2"
  local pids answer pid remaining alternative_answer suggested_port requested_port

  SELECTED_PORT="$port"

  pids="$(get_port_pids "$port")"
  [[ -z "$pids" ]] && return 0

  echo "$label portu ($port) zaten kullanımda. PID: $(echo "$pids" | tr '\n' ' ')"
  read -r -p "Bu portu kullanan süreç kapatılsın mı? [e/H]: " answer || true
  case "${answer:-H}" in
    E|e|Y|y)
      while IFS= read -r pid; do
        [[ -z "$pid" ]] && continue
        case "${OSTYPE:-}" in
          msys*|mingw*|cygwin*) taskkill.exe //PID "$pid" //T //F >/dev/null ;;
          *) kill "$pid" ;;
        esac
      done <<< "$pids"
      sleep 1
      remaining="$(get_port_pids "$port")"
      if [[ -n "$remaining" ]]; then
        echo "Hata: $port portu boşaltılamadı. Kalan PID: $remaining" >&2
        return 1
      fi
      echo "$port portu boşaltıldı."
      ;;
    *)
      read -r -p "Alternatif bir port kullanılsın mı? [E/h]: " alternative_answer || true
      case "${alternative_answer:-E}" in
        E|e|Y|y)
          suggested_port=$((port + 1))
          while [[ -n "$(get_port_pids "$suggested_port")" ]]; do
            suggested_port=$((suggested_port + 1))
          done

          while true; do
            requested_port="$(prompt_with_default "Kullanılacak alternatif $label portu" "$suggested_port")"
            if [[ ! "$requested_port" =~ ^[0-9]+$ ]] || ((requested_port < 1 || requested_port > 65535)); then
              echo "Geçersiz port. 1-65535 arasında bir sayı girin."
              continue
            fi
            if [[ -n "$(get_port_pids "$requested_port")" ]]; then
              echo "$requested_port portu da kullanımda; başka bir port seçin."
              continue
            fi
            SELECTED_PORT="$requested_port"
            echo "$label için $SELECTED_PORT portu seçildi."
            return 0
          done
          ;;
        *)
          echo "Başlatma iptal edildi; çalışan süreçlere dokunulmadı."
          return 1
          ;;
      esac
      ;;
  esac
}

configure_project() {
  local mongo_uri backend_port frontend_port api_uri jwt_secret

  echo
  echo "Ortam ayarları (değer girmeden Enter'a basarsanız varsayılan kullanılır):"
  mongo_uri="$(prompt_with_default "MongoDB bağlantı adresi" "mongodb://127.0.0.1:27017/pdos")"
  backend_port="$(prompt_with_default "Backend portu" "6021")"
  frontend_port="$(prompt_with_default "Frontend portu" "3000")"
  api_uri="$(prompt_with_default "Frontend API adresi" "http://localhost:${backend_port}/api")"
  jwt_secret="$(node -e "process.stdout.write(require('crypto').randomBytes(48).toString('hex'))")"

  cat > "$SERVER_DIR/.env" <<EOF
PORT=$backend_port
MONGO_URI=$mongo_uri
JWT_SECRET=$jwt_secret
EOF

  cat > "$CLIENT_DIR/.env" <<EOF
NEXT_PUBLIC_API_URI=$api_uri
PORT=$frontend_port
EOF

  echo "Ortam dosyaları oluşturuldu; JWT anahtarı güvenli ve rastgele üretildi."
}

if $REINSTALL || ! is_installed; then
  if $REINSTALL; then
    echo "Yeniden kurulum başlatılıyor..."
  else
    echo "İlk kurulum başlatılıyor..."
  fi

  echo "Backend paketleri kuruluyor..."
  (cd "$SERVER_DIR" && npm install)

  echo "Frontend paketleri kuruluyor..."
  (cd "$CLIENT_DIR" && npm install)

  configure_project
  echo "Kurulum tamamlandı."
else
  echo "PDOS zaten kurulu; kurulum adımları atlandı."
fi

read -r -p "Uygulama şimdi çalıştırılsın mı? [E/h]: " run_answer || true
case "${run_answer:-E}" in
  E|e|Y|y)
    frontend_port="$(get_env_value "$CLIENT_DIR/.env" "PORT")"
    api_uri="$(get_env_value "$CLIENT_DIR/.env" "NEXT_PUBLIC_API_URI")"
    backend_port="$(get_env_value "$SERVER_DIR/.env" "PORT")"
    frontend_url="http://localhost:${frontend_port:-3000}"

    frontend_port="${frontend_port:-3000}"
    backend_port="${backend_port:-6021}"

    ensure_port_available "$frontend_port" "Frontend" || exit 1
    if [[ "$SELECTED_PORT" != "$frontend_port" ]]; then
      frontend_port="$SELECTED_PORT"
      set_env_value "$CLIENT_DIR/.env" "PORT" "$frontend_port"
    fi

    ensure_port_available "$backend_port" "Backend" || exit 1
    if [[ "$SELECTED_PORT" != "$backend_port" ]]; then
      backend_port="$SELECTED_PORT"
      api_uri="http://localhost:${backend_port}/api"
      set_env_value "$SERVER_DIR/.env" "PORT" "$backend_port"
      set_env_value "$CLIENT_DIR/.env" "NEXT_PUBLIC_API_URI" "$api_uri"
    fi

    frontend_url="http://localhost:${frontend_port}"

    echo "Backend ve frontend başlatılıyor. Durdurmak için Ctrl+C kullanın."
    echo
    echo "Frontend : $frontend_url"
    echo "Giriş     : $frontend_url/login"
    echo "Backend API: ${api_uri:-http://localhost:6021/api}"
    echo

    (cd "$SERVER_DIR" && npm run dev) &
    server_pid=$!
    (cd "$CLIENT_DIR" && npm run dev -- --port "${frontend_port:-3000}") &
    client_pid=$!

    cleanup() {
      kill "$server_pid" "$client_pid" 2>/dev/null || true
      wait "$server_pid" "$client_pid" 2>/dev/null || true
    }
    trap cleanup EXIT INT TERM

    wait -n "$server_pid" "$client_pid"
    ;;
  *)
    echo "Kurulum hazır. Daha sonra başlatmak için: bash ./start.sh"
    ;;
esac
