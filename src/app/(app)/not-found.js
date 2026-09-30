import NotFound from "@/shared/pages/NotFoundPage";

export default function AppNotFound() {
  return (
    <NotFound
      title="404"
      description="Aradığınız içerik bulunamadı"
      linkText="Kaldırılmış olabilir ya da erişim yetkiniz olmayabilir."
      buttonText="Dashboard'a dön"
      route="/dashboard"
    />
  );
}
