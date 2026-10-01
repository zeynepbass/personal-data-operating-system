# ADR-0003: Server Actions ve Route Handlers ayrımı

- Durum: Kabul edildi
- Tarih: 2026-10-01

## Karar

| İhtiyaç                                     | Kullanılan                  | Örnek                                        |
| ------------------------------------------- | --------------------------- | -------------------------------------------- |
| Sayfa verisini okumak                       | Server Component → service  | `app/(app)/notes/page.js` → `listNotes`      |
| Form gönderimi, silme, güncelleme           | Server Action               | `createNoteAction`, `changeTaskStatusAction` |
| İstemcinin tekrar tekrar çektiği canlı veri | Route Handler + React Query | `GET /api/tasks`, `GET /api/notifications`   |
| Dosya yükleme / indirme                     | Route Handler               | `POST /api/documents`, `GET /api/files/:id`  |
| Sayfalama ile ek veri                       | Route Handler               | `GET /api/notes?cursor=...`                  |

Kurallar:

1. Server Action ve Route Handler'lar ince kalır: oturum → service çağrısı → `revalidatePath`. İş kuralı ve yetki kontrolü service'tedir; böylece aynı kural her giriş noktasında uygulanır ve Next.js olmadan test edilir.
2. Server Action'lar `runAction` ile sarılır ve her zaman `{ ok, data, error, code, fieldErrors }` döner. Beklenen hatalar `AppError` ile ifade edilir; beklenmeyenler loglanır ve istemciye genel bir mesaj gider. `redirect()` gibi Next.js kontrol akışı hataları `unstable_rethrow` ile korunur.
3. Route Handler'lar `authedRoute` ile sarılır; `AppError` HTTP durum koduna çevrilir. Veri değiştiren Route Handler'lar Origin doğrulaması yapar (Server Action'larda bu Next.js tarafından yapılır).
4. React Query yalnızca görev panosu ve bildirimlerde kullanılır: sürükle-bırak için optimistic update + hata durumunda geri alma ve periyodik yenileme gerekir. Not düzenleme için React'in `useOptimistic` hook'u yeterlidir; diğer sayfalar Server Component verisi ile çalışır.

## Neden dosya yükleme Server Action değil?

Server Action gövdeleri tamamen belleğe alınır ve boyut sınırı uygulama genelindedir. Belgelerde (10 MB) istek başlığındaki uzunluğu okumadan önce reddetmek, Origin kontrolü ve `201` gibi anlamlı durum kodları istendiği için Route Handler seçildi. Profil fotoğrafı (2 MB) ise profil formunun parçası olduğu için Server Action içinde kalır.

## Sonuçlar

- İstemci tarafında axios ve özel API katmanı kalmadı; `fetch` yalnızca iki polling uç noktası ve dosya yükleme için kullanılıyor.
- Server Action'lar yalnızca bu uygulama tarafından çağrılabilir; dış tüketiciler için kararlı bir sözleşme değildir.
