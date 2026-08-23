import { Button, Heading } from "@/shared/components/atoms";

import { Eye, PencilIcon, TrashIcon } from "lucide-react";
import Modal from "../SettingsModal";

export default function SettingsSecurity({ open, setOpen, data, router,deleteAccount }) {
  const SecurityItem = ({
    title,
    description,
    action,
    danger = false,
    border = true,
    className,
    text,
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
          text={text}
          className={`text-white ${className}`}
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
          text={
            <PencilIcon
              className="text-[#555A8A]"
              width={20}
              height={20}
              onClick={() => router.push("/forgot-password")}
            />
          }
          className="bg-transparent "
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
          text={
            <Eye
              className="text-[#555A8A]"
              width={20}
              height={20}
              onClick={() => setOpen(!open)}
            />
          }
          className="bg-transparent "
        />
        {open && (
          <Modal
            open={open}
            onClose={() => setOpen(false)}
            title="Parola Bilgileri"
          >
            <div className="space-y-4">
              <div className="rounded-xl border border-gray-200 p-4">
                <p className="font-medium text-gray-900">
                  {data?.passwordChangedAt
                    ? new Date(data.passwordChangedAt).toLocaleDateString(
                        "tr-TR"
                      )
                    : "Henüz değiştirilmedi"}
                </p>
              </div>
            </div>
          </Modal>
        )}
        <SecurityItem
          title="Hesabı Sil"
          description="Bu işlem geri alınamaz."
          border={false}
          text={<TrashIcon className="text-[#555A8A]" width={20} height={20}  onClick={() =>deleteAccount()}/>}
          className="bg-transparent "
        />
      </div>
    </section>
  );
}
