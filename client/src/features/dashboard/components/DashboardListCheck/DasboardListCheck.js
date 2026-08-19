
export default function DashboardListCheck({ filteredData}){
    return(
         <div className="scrollbar-thin mt-5 flex flex-col gap-3  h-[32vh] overflow-y-auto">
          {filteredData.length=== 0 ? (
              <div className="py-6 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Bugün için bir görev oluşturulmadı.
              </p>
            </div>
          ) : (
            filteredData
              .slice(0, 3)
              .map((task,index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 rounded-xl border border-gray-100 dark:border-white/10 p-3 transition hover:bg-gray-50 dark:hover:bg-white/5"
                >


                  <span
                    className={`text-sm ${
                      task?.completed
                        ? "line-through text-gray-500 dark:text-gray-500"
                        : "text-gray-700 dark:text-gray-200"
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