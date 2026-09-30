"use client";

export default function GlobalError({ reset }) {
  return (
    <html lang="tr">
      <body
        style={{
          fontFamily: "system-ui, sans-serif",
          display: "grid",
          placeItems: "center",
          minHeight: "100vh",
        }}
      >
        <main role="alert" style={{ textAlign: "center" }}>
          <h1>Uygulama yüklenemedi</h1>
          <p>Lütfen sayfayı yenileyin.</p>
          <button type="button" onClick={() => reset()}>
            Tekrar dene
          </button>
        </main>
      </body>
    </html>
  );
}
