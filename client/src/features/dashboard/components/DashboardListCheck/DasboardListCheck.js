
export default function DashboardListCheck({ filteredData}){
    return(
         <div className="mt-5 flex flex-col gap-3  h-[32vh] overflow-scroll">
          {filteredData.length=== 0 ? (
              <div className="py-6 text-center">
              <p className="text-sm text-gray-500">
                Bugün için bir görev oluşturulmadı.
              </p>
            </div>
          ) : (
            filteredData
              .slice(0, 3)
              .map((task,index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 rounded-xl border border-gray-100 p-3 transition hover:bg-gray-50"
                >
        

                  <span
                    className={`text-sm ${
                      task?.completed
                        ? "line-through text-gray-500"
                        : "text-gray-700"
                    }`}
                  >
                    {task?.title}
                  </span>
                </div>
              ))
          )}
             
                  </div>
    )
}