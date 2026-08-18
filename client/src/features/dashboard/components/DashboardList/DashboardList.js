export default function DashboardList({documents}){

    return(
        <ul className="space-y-2 text-sm text-gray-600">
          {documents.map((item)=>{
            return(
              <li key={item.id} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-indigo-50 transition">
              <div className="w-2 h-2 rounded-full bg-purple-300"></div>
    
              <span>{item.title}</span>
            </li>
            )
          })}
   
 
      </ul>
    )
}