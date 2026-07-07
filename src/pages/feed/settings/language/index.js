
import { Button, Select } from "@/components/atoms";
import { Heading } from "@/components/molecules";

export default function Language() {
  const SelectRow = ({
    title,
    description,
    placeholder,
    options,
  }) => (
    <div className="flex items-center justify-between border-b border-gray-200 px-8 py-6 last:border-none">
      <div className="max-w-md">
        <Heading
          title={title}
          description={description}
          className="text-base font-medium"
          descriptionClassName="mt-1 text-sm text-muted-foreground"
        />
      </div>

      <div className="w-72">
        <Select
          placeholder={placeholder}
          options={options}
        />
      </div>
    </div>
  );

  return (
    <section className="space-y-8">
      <Heading
        title="Dil ve Bölge"
        description="Uygulama dili, tarih, saat ve bölgesel tercihlerinizi yönetin."
        className="text-3xl font-bold"
        descriptionClassName="mt-2 text-base text-muted-foreground"
      />


      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-8 py-6">
          <Heading
            title="Dil Ayarları"
            description="Uygulamanın görüntüleme dilini belirleyin."
            className="text-xl font-semibold"
          />
        </div>

        <SelectRow
          title="Uygulama Dili"
          description="Arayüzde kullanılan dili değiştirin."
          placeholder="Dil seçiniz"
          options={[
            { value: "tr", label: "🇹🇷 Türkçe" },
            { value: "en", label: "🇺🇸 English" },
            { value: "de", label: "🇩🇪 Deutsch" },
            { value: "fr", label: "🇫🇷 Français" },
          ]}
        />

        <SelectRow
          title="Bölge"
          description="Tarih ve para birimi biçimlerini etkiler."
          placeholder="Bölge seçiniz"
          options={[
            { value: "tr", label: "Türkiye" },
            { value: "us", label: "United States" },
            { value: "de", label: "Germany" },
            { value: "uk", label: "United Kingdom" },
          ]}
        />

        <SelectRow
          title="Saat Dilimi"
          description="Yerel saatinizi belirleyin."
          placeholder="Saat dilimi seçiniz"
          options={[
            { value: "istanbul", label: "Europe/Istanbul" },
            { value: "london", label: "Europe/London" },
            { value: "newyork", label: "America/New_York" },
            { value: "tokyo", label: "Asia/Tokyo" },
          ]}
        />

        <SelectRow
          title="Tarih Formatı"
          description="Tarihlerin nasıl görüntüleneceğini seçin."
          placeholder="Tarih formatı seçiniz"
          options={[
            { value: "tr", label: "07.07.2026" },
            { value: "us", label: "07/07/2026" },
            { value: "en", label: "Jul 7, 2026" },
            { value: "iso", label: "2026-07-07" },
          ]}
        />

        <SelectRow
          title="Saat Formatı"
          description="12 veya 24 saatlik zaman gösterimini belirleyin."
          placeholder="Saat formatı seçiniz"
          options={[
            { value: "24", label: "24 Saat" },
            { value: "12", label: "12 Saat (AM / PM)" },
          ]}
        />
      </div>


      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-8 py-6">
          <Heading
            title="Yerel Tercihler"
            description="Sayı ve para birimi görüntüleme tercihlerini yönetin."
            className="text-xl font-semibold"
          />
        </div>

        <SelectRow
          title="Para Birimi"
          description="Varsayılan para birimini seçin."
          placeholder="Para birimi seçiniz"
          options={[
            { value: "try", label: "TRY - Türk Lirası" },
            { value: "usd", label: "USD - US Dollar" },
            { value: "eur", label: "EUR - Euro" },
            { value: "gbp", label: "GBP - Pound" },
          ]}
        />

        <SelectRow
          title="Sayı Formatı"
          description="Ondalık ve binlik ayırıcı biçimini belirleyin."
          placeholder="Sayı formatı seçiniz"
          options={[
            { value: "tr", label: "1.234,56" },
            { value: "en", label: "1,234.56" },
            { value: "fr", label: "1 234,56" },
          ]}
        />
      </div>

      <div className="flex justify-end gap-3 border-t border-gray-200 pt-6">
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

