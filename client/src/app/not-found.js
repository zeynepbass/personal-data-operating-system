import NotFound from "@/shared/pages/NotFoundPage";

export default function NotFoundPage() {
  return (
      <NotFound
        title="404"
        description="Sayfa Bulunamadı"
        linkText="Aradığınız sayfa kaldırılmış olabilir."
        buttonText="Ana Sayfaya Dön"
        route="/"
      />
  );
}