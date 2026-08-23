import {
  Button,
  Heading
} from "@/shared/components/atoms";
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
                         className="text-white"
          variant={danger ? "destructive" : "outline"}
        />
      )}
    </div>
  );

  return (
    <section className="space-y-8">



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
                                        className="text-white"
            />
          }
        />
      </div>


    </section>
  );
}