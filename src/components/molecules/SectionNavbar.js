export const SectionNavbar=()=>{
    return(
        <div className="sticky top-24 rounded-2xl border bg-white p-6">
        <h3 className="mb-5 font-semibold">Bu Sayfada</h3>
  
        <nav className="space-y-3 text-sm">
          <a
            href="#neden"
            className="block text-slate-600 hover:text-violet-600"
          >
            Neden useMemo?
          </a>

          <a
            href="#syntax"
            className="block text-slate-600 hover:text-violet-600"
          >
            Syntax
          </a>

          <a
            href="#ornek"
            className="block text-slate-600 hover:text-violet-600"
          >
            Örnek Kullanım
          </a>

          <a
            href="#avantaj"
            className="block text-slate-600 hover:text-violet-600"
          >
            Avantajları
          </a>

          <a
            href="#ozet"
            className="block text-slate-600 hover:text-violet-600"
          >
            Özet
          </a>
        </nav></div>
    )
}