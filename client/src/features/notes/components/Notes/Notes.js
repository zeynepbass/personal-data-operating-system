
import NotesCard from "../NotesCard";
import NotesNavbar from "../NotesNavbar"
export default function Notes(){
    return(

            <div className="mx-auto flex max-w-7xl gap-10 px-8 py-10">
              <NotesCard />
        
              <aside className="hidden w-64 xl:block">
                <NotesNavbar />
              </aside>
            </div>

    )
}