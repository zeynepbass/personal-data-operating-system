# ADR-0001: Express + SPA yerine tek Next.js full-stack uygulaması

- Durum: Kabul edildi
- Tarih: 2026-09-30

## Bağlam

Proje iki parçadan oluşuyordu: `client/` altında SPA gibi kullanılan bir Next.js uygulaması (sayfaların hepsi `"use client"`, veri axios ile çekiliyordu) ve `server/` altında bir Express + Mongoose API. Bu yapının somut sorunları:

- Aynı veri modeli iki yerde tanımlıydı, doğrulama hiçbir yerde yoktu.
- İki origin arası çerez gerektiği için production'da `sameSite=none` + CORS kullanılıyordu (CSRF yüzeyi).
- Kimlik doğrulama durumu istemcide `localStorage`'da tutuluyordu; route koruması tarayıcıda yapılıyordu.
- Her sayfa önce boş render oluyor, ardından API'ye istek atıyordu.

## Karar

Tüm backend mantığı Next.js içine taşındı ve Express kaldırıldı:

- Okuma: Server Component'ler `src/server/services` fonksiyonlarını doğrudan çağırır.
- Yazma: Server Actions.
- HTTP gerektiren istisnalar (dosya, polling): Route Handlers.
- Sunucu kodu `src/server/**` altında, `server-only` ile korunur.

Geçiş feature feature yapıldı. Geçiş süresince Express, Next.js'in `rewrites` özelliğiyle aynı origin'e alındı ve yeni oturum koleksiyonunu okuyacak şekilde uyarlandı; her feature taşındıkça Express tarafındaki karşılığı silindi. Mevcut veriyi yeni şemaya taşımak için idempotent migration'lar (`scripts/migrations.mjs`) yazıldı.

## Sonuçlar

- Tek deploy birimi, tek origin, `sameSite=lax` çerez.
- Veri erişimi ve yetki kontrolleri tek katmanda, testleri Next.js'ten bağımsız (service fonksiyonları düz JavaScript).
- Server Actions Next.js'e bağımlıdır; başka istemcilere (mobil vb.) açık bir API gerekirse Route Handler olarak eklenmelidir.
- Geçiş sırasında öğrenilen: eski sunucu Mongoose `autoIndex` ile kaldırılan index'leri yeniden oluşturabiliyor. Bu yüzden Express kaldırıldıktan sonra index temizliğini tekrar yapan ikinci bir migration eklendi.
