# ADR-0002: Veritabanı tabanlı opak session

- Durum: Kabul edildi
- Tarih: 2026-09-30

## Bağlam

Eski sistem 7 gün geçerli bir JWT'yi hem `Authorization` başlığında hem çerezde kabul ediyordu. Çıkış token'ı iptal etmiyor, şifre değişikliği eski token'ları geçersiz kılmıyordu. Şifre sıfırlama ise yalnızca e-posta adresiyle yapılabiliyordu (hesap ele geçirme).

Değerlendirilen seçenekler:

|                             | Auth.js v5 (Credentials)                                                                                    | `jose` ile imzalı JWT                           | Opak token + `sessions` koleksiyonu |
| --------------------------- | ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------- | ----------------------------------- |
| İptal / `passwordChangedAt` | Credentials sağlayıcısı yalnızca JWT stratejisiyle çalışır; iptal için yine her istekte DB kontrolü gerekir | Aynı durum; stateless olmanın avantajı kaybolur | Doğal: kaydı silmek yeterli         |
| Bağımlılık                  | Büyük API yüzeyi, OAuth kullanılmıyor                                                                       | Küçük                                           | Yok (Node `crypto`)                 |
| Proxy'de doğrulama          | Evet                                                                                                        | Evet                                            | Hayır (yalnızca çerez var mı)       |

## Karar

Opak token + `sessions` koleksiyonu:

- 32 byte `randomBytes` token, çerezde `httpOnly`, `sameSite=lax`, production'da `secure` ve `__Host-` önekiyle.
- Veritabanında yalnızca SHA-256 özeti tutulur.
- 7 gün hareketsizlik (günde en fazla bir kez uzatılır), 30 gün mutlak ömür, TTL index ile otomatik temizlik.
- Her girişte yeni token; çıkış kaydı siler.
- Şifre sıfırlandığında kullanıcının tüm oturumları silinir; ek savunma olarak `session.createdAt < user.passwordChangedAt` olan oturum reddedilir.
- `proxy.js` yalnızca çerez varlığına bakıp hızlı yönlendirme yapar. Asıl doğrulama `src/server/auth/dal.js` içindeki `getCurrentUser` / `requireUser` ile her Server Component, Server Action ve Route Handler'da tekrarlanır (`React.cache` ile istek başına bir DB okuması).

## Sonuçlar

- Her kimliği doğrulanmış istek bir DB okuması yapar; bu uygulama ölçeğinde ihmal edilebilir.
- Oturum listeleme / "diğer cihazlardan çıkış" gibi özellikler ek maliyetsiz eklenebilir.
- Geçişte mevcut JWT oturumları geçersiz oldu; kullanıcıların bir kez yeniden giriş yapması gerekti.
