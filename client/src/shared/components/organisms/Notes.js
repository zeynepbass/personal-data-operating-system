import { SectionNavbar, Card } from "@/components/molecules";
export const Notes=()=>{
    return(

            <div className="mx-auto flex max-w-7xl gap-10 px-8 py-10">
              <Card />
        
              <aside className="hidden w-64 xl:block">
                <SectionNavbar />
              </aside>
            </div>

    )
}