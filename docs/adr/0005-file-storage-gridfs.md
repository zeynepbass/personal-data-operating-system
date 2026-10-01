# ADR-0005: Dosyalar için GridFS

- Durum: Kabul edildi
- Tarih: 2026-09-30

## Bağlam

Eski sistem PDF ve profil fotoğraflarını `uploads/` klasörüne orijinal dosya adıyla yazıyor ve bu klasörü kimlik doğrulaması olmadan statik olarak sunuyordu. Profil fotoğrafında tür kontrolü yoktu (HTML/SVG yüklenebiliyordu), PDF kontrolü yalnızca istemcinin bildirdiği MIME türüne bakıyordu.

Seçenekler:

|                   | Yerel disk (volume) | GridFS                | S3 / MinIO                                  |
| ----------------- | ------------------- | --------------------- | ------------------------------------------- |
| Vercel/serverless | Çalışmaz            | Çalışır               | Çalışır                                     |
| Ek altyapı        | Yok                 | Yok (MongoDB)         | Bucket + kimlik bilgileri, compose'a servis |
| Sahiplik kontrolü | Ayrı kayıt gerekir  | Metadata'da, aynı DB  | Ayrı kayıt + imzalı URL                     |
| Maliyet           | Disk                | Atlas depolama kotası | Nesne depolama                              |

## Karar

GridFS (`files` bucket). Her dosyanın metadata'sında `owner`, `kind` (`avatar` / `document`), tespit edilen `contentType`, orijinal ad ve `shared` bilgisi tutulur.

- Yükleme: içerikten tür tespiti (`file-type`, magic bytes), tür başına izin listesi (avatar: PNG/JPEG/WebP; belge: PDF), boyut sınırı (2 MB / 10 MB), rastgele dosya adı.
- İndirme: `GET /api/files/:id` oturum ister; sahibi, admin ya da `shared` dosyalar için okunabilir. Diğer durumlarda `404`. Yanıtta `nosniff`, `Content-Disposition` ve `sandbox` CSP bulunur.
- Silme: kullanıcı ya da belge silindiğinde ilgili dosyalar da silinir.
- Eski dosyalar `LEGACY_UPLOADS_DIR` tanımlıysa migration ile GridFS'e aktarılır; klasör dışına çıkan yollar reddedilir.

## Sonuçlar

- Docker ve Vercel+Atlas'ta aynı kod çalışır.
- Büyük dosya hacmi için uygun değildir (Atlas ücretsiz katmanı 512 MB). Hacim büyürse `file.service.js` arayüzü (`storeFile`, `openFileForRead`, `deleteFile`) korunarak S3'e geçilebilir.
