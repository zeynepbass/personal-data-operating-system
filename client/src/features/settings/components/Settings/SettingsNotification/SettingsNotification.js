
import Input from "@/shared/components/atoms/Input";
import  Button  from "@/shared/components/atoms/Input";
import Heading from "@/shared/components/atoms/Heading";

export default function SettingsNotification() {
  const Item = ({
    title,
    description,
    border = true,
    disabled = false,
  }) => (
    
    <div
      className={`flex items-start justify-between gap-6 p-6 ${
        border ? "border-b border-gray-200" : ""
      }`}
    >
      <Heading
        title={title}
        description={description}


      />
 <Input 
 type="checkbox"
  defaultChecked={!disabled}    
       disabled={disabled}/>

    </div>
  );

  return (
<section className="space-y-8">

<Heading
  title="Bildirimler"
  description="E-posta, uygulama içi ve güvenlik bildirimlerinizi yönetin."

/>

<div className="space-y-6">


  <div className="overflow-hidden rounded-2xl border bg-white border-gray-200 shadow-sm">
    <div className="border-b border-gray-200 px-8 py-6">
      <Heading
        title="Genel Bildirimler"
        description="Uygulama genelindeki bildirim tercihlerinizi yönetin."

      />
    </div>

    <Item
      title="Uygulama Bildirimleri"
      description="Uygulama içerisindeki bildirimleri etkinleştir."
    />

    <Item
      title="E-posta Bildirimleri"
      description="Önemli gelişmeleri e-posta ile al."
    />

    <Item
      title="Push Bildirimleri"
      description="Tarayıcı üzerinden anlık bildirim gönder."
      border={false}
    />
  </div>


  <div className="overflow-hidden rounded-2xl border bg-white border-gray-200 bg-background shadow-sm">
    <div className="border-b border-gray-200 px-8 py-6">
      <Heading
        title="Etkileşim Bildirimleri"
        description="Diğer kullanıcılarla olan etkileşimleriniz."
        className="text-xl font-semibold"
      />
    </div>

    <Item
      title="Yeni Takipçiler"
      description="Yeni bir takipçi kazandığınızda bildir."
    />

    <Item
      title="Yorumlar"
      description="Gönderilerinize yorum yapıldığında bildir."
    />

    <Item
      title="Beğeniler"
      description="Gönderileriniz beğenildiğinde bildir."
    />

    <Item
      title="Bahsedilmeler"
      description="@kullanici olarak etiketlendiğinizde bildir."
      border={false}
    />
  </div>


  <div className="overflow-hidden rounded-2xl border bg-white  border-gray-200 bg-background shadow-sm">
    <div className="border-b border-gray-200 px-8 py-6">
      <Heading
        title="Güvenlik Bildirimleri"
        description="Hesabınızın güvenliği ile ilgili kritik bildirimler."

      />
    </div>

    <Item
      title="Yeni Girişler"
      description="Yeni bir cihazdan giriş yapıldığında bildir."
      disabled
    />

    <Item
      title="Şifre Değişikliği"
      description="Şifreniz değiştirildiğinde bildir."
      disabled
    />

    <Item
      title="İki Adımlı Doğrulama"
      description="Doğrulama kodu istendiğinde bildir."
      disabled
      border={false}
    />

    <div className="border-t  border-gray-200 bg-muted/40 px-8 py-5 text-xs text-muted-foreground">
      Güvenlik bildirimleri hesabınızı korumak amacıyla devre dışı bırakılamaz.
    </div>
  </div>

</div>

<div className="flex justify-end gap-3 border-t  border-gray-200 p-3">
  <Button
    variant="outline"
    text="Varsayılana Döndür"
  />

  <Button
    text="Değişiklikleri Kaydet"
  />
</div>

</section>
  );
}
