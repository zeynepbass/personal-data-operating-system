# ADR-0004: TypeScript yerine zod + JSDoc + test

- Durum: Kabul edildi
- Tarih: 2026-09-30

## Bağlam

Proje JavaScript ile yazılmıştı ve ekipte JavaScript tercih ediliyor. Tip güvenliğinden beklenen asıl fayda — sınırlarda yanlış veri girmemesi — derleme zamanında değil, çalışma zamanında gerçekleşen bir problemdir: form verisi, `FormData`, URL parametreleri ve veritabanındaki eski kayıtlar derleyicinin göremediği girdilerdir.

## Karar

- **zod** tek kaynak şemalar olarak `src/shared/schemas` altında tutulur. Aynı şema react-hook-form'da istemci doğrulaması, service katmanında sunucu doğrulaması için kullanılır. Ortam değişkenleri de zod ile doğrulanır (`src/server/env.js`).
- **JSDoc** (`@param`, `@returns`, `@typedef`) service, repository ve DTO dönüşümlerinde kullanılır; editörde tamamlama ve dokunulan sözleşmelerin görünmesi için yeterlidir.
- **Testler** sınır durumlarını kanıtlar: `null` gövde, yanlış tip, eksik alan, geçersiz ObjectId, bozuk sayfalama imleci, 72 byte'tan uzun bcrypt girdisi gibi.
- **ESLint** (`import/no-unresolved`, `no-restricted-imports` ile istemci/sunucu sınırı, `react-hooks`) statik hataları yakalar.
- Projede `.ts/.tsx` dosyası, `tsconfig` ya da `typescript` bağımlılığı yoktur. (`eslint-config-next`, kendi parser'ı için `typescript`'i dolaylı peer bağımlılık olarak getirir; proje kodu onu kullanmaz.)

## Sonuçlar

- Doğrulama, dışarıdan gelen her girdide çalışma zamanında garanti edilir.
- Service'ler arası iç çağrılarda derleme zamanı kontrolü yoktur; bu risk testlerle karşılanır.
- zod'un istemci paketine eklenmesi giriş sayfalarında yaklaşık 100 KB JS maliyeti getirir. Gerekirse şemalar ağaç sallanabilir `zod/mini` API'sine taşınabilir; şemaların tek dosyada toplanmış olması bu geçişi yerel tutar.
