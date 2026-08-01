export default function DashboardList({data}){
    return(
        <ul className="space-y-2 text-sm text-gray-600">
          {data.map((item)=>{
            return(
              <li className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-indigo-50 transition">
              <div className="w-2 h-2 rounded-full bg-[#555A8A]"></div>
    
              <span>{item.name}</span>
            </li>
            )
          })}
   
 
      </ul>
    )
}