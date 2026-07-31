export default function NotesCard(){
    return(
        <article className="flex-1">
        <span className="rounded-full bg-violet-100 px-3 py-1 text-sm font-medium text-violet-700">
          React / Performance
        </span>

        <h1 className="mt-4 text-4xl font-bold tracking-tight">
          useMemo Nedir?
        </h1>

        <p className="mt-4 text-lg text-slate-600">
          useMemo, React uygulamalarında maliyetli hesaplamaları optimize etmek
          için kullanılan bir Hook'tur. Aynı hesaplamanın her render'da tekrar
          yapılmasını engelleyerek performansı artırır.
        </p>

        <hr className="my-10" />

        <section id="neden">
          <h2 className="text-2xl font-semibold">Neden useMemo Kullanılır?</h2>

          <p className="mt-4 leading-8 text-slate-600">
            Büyük dizileri filtrelemek, sıralamak veya karmaşık hesaplamalar
            yapmak her render sırasında uygulamanın yavaşlamasına neden olabilir.
            useMemo sonucu bellekte saklar ve yalnızca bağımlılıklar değiştiğinde
            yeniden hesaplar.
          </p>
        </section>

        <section id="syntax" className="mt-14">
          <h2 className="text-2xl font-semibold">Syntax</h2>

          <div className="mt-5 overflow-hidden rounded-xl bg-slate-900 p-5">
            <pre className="overflow-x-auto text-sm text-slate-100">
{`const value = useMemo(() => {
  return expensiveCalculation();
}, [dependencies]);`}
            </pre>
          </div>
        </section>

        <section id="ornek" className="mt-14">
          <h2 className="text-2xl font-semibold">Örnek Kullanım</h2>

          <div className="mt-5 overflow-hidden rounded-xl bg-slate-900 p-5">
            <pre className="overflow-x-auto text-sm text-slate-100">
{`const filteredUsers = useMemo(() => {
  return users.filter(user =>
    user.name.includes(search)
  );
}, [users, search]);`}
            </pre>
          </div>

          <p className="mt-6 leading-8 text-slate-600">
            Artık filtreleme yalnızca users veya search değiştiğinde tekrar
            çalışacaktır.
          </p>
        </section>

        <section id="avantaj" className="mt-14">
          <h2 className="text-2xl font-semibold">Avantajları</h2>

          <ul className="mt-5 list-disc space-y-3 pl-6 text-slate-600">
            <li>Gereksiz hesaplamaları önler.</li>
            <li>Büyük listelerde performansı artırır.</li>
            <li>CPU kullanımını azaltır.</li>
            <li>Daha akıcı kullanıcı deneyimi sağlar.</li>
          </ul>
        </section>

        <section id="ozet" className="mt-14">
          <h2 className="text-2xl font-semibold">Özet</h2>

          <div className="mt-5 rounded-xl border border-violet-200 bg-violet-50 p-6">
            <p className="text-slate-700">
              useMemo, pahalı hesaplamaları bellekte saklayan ve yalnızca
              bağımlılıklar değiştiğinde yeniden hesaplayan bir React Hook'udur.
              Performans optimizasyonu gereken durumlarda kullanılmalıdır.
            </p>
          </div>
        </section>
      </article>
    )
}