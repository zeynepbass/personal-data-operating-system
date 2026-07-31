import Button from "@/shared/components/atoms/Button"
import Heading  from "@/shared/components/atoms/Heading";

export default function  SettingsSecurity() {
  const SecurityItem = ({
    title,
    description,
    action,
    danger = false,
    border = true,
  }) => (
    <div
      className={`flex items-center justify-between px-8 py-6 ${
        border ? "border-b border-gray-200" : ""
      }`}
    >
      <div className="max-w-lg">
        <Heading
          title={title}
          description={description}
          className="text-base font-medium"
          descriptionClassName="mt-1 text-sm text-muted-foreground"
        />
      </div>

      {action || (
        <Button
          text="Düzenle"
          variant={danger ? "destructive" : "outline"}
        />
      )}
    </div>
  );

  return (
    <section className="space-y-8">
      <Heading
        title="Güvenlik"
        description="Hesabınızın güvenlik ayarlarını ve oturumlarını yönetin."
        className="text-3xl font-bold"
        descriptionClassName="mt-2 text-base text-muted-foreground"
      />


      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-8 py-6">
          <Heading
            title="Hesap Güvenliği"
            description="Şifre ve doğrulama ayarlarınızı yönetin."
            className="text-xl font-semibold"
          />
        </div>

        <SecurityItem
          title="Şifre"
          description="Son değiştirilme: 18 gün önce."
        />

        <SecurityItem
          title="İki Adımlı Doğrulama"
          description="Hesabınıza ek güvenlik katmanı ekleyin."
        />

        <SecurityItem
          title="Yedek Kurtarma Kodları"
          description="Acil durumlarda hesabınıza erişmek için kullanılır."
          border={false}
        />
      </div>


      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-8 py-6">
          <Heading
            title="Aktif Oturumlar"
            description="Hesabınızın giriş yaptığı cihazları görüntüleyin."
            className="text-xl font-semibold"
          />
        </div>

        <SecurityItem
          title="MacBook Pro • Chrome"
          description="Konya, Türkiye • Şu anda aktif"
        />

        <SecurityItem
          title="iPhone 15 • Safari"
          description="2 gün önce giriş yapıldı"
          border={false}
          action={
            <Button
              variant="outline"
              text="Oturumu Kapat"
            />
          }
        />
      </div>


      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-8 py-6">
          <Heading
            title="Güvenlik Bildirimleri"
            description="Hesabınızla ilgili önemli olaylar."
            className="text-xl font-semibold"
          />
        </div>

        <SecurityItem
          title="Son Başarılı Giriş"
          description="Bugün 10:42 • Konya, Türkiye"
        />

        <SecurityItem
          title="Son Şifre Değişikliği"
          description="18 gün önce"
        />

        <SecurityItem
          title="Hesabı Sil"
          description="Bu işlem geri alınamaz."
          border={false}
          action={
            <Button
              text="Hesabı Sil"
              variant="destructive"
            />
          }
        />
      </div>

      <div className="flex justify-end gap-3 border-t border-gray-200 pt-6">
        <Button
          variant="outline"
          text="İptal"
        />

        <Button
          text="Değişiklikleri Kaydet"
        />
      </div>
    </section>
  );
}