import Button from "@/shared/components/atoms/Button"

export default function TableView ({ rows ,openMenuId,onMenuClick}) {
  return (
    <div className="overflow-hidden rounded-2xl p-2 border border-gray-200 bg-white shadow-sm">
      <table className="w-full border-separate border-spacing-0">
        <thead>
          <tr className="">
            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
              Task
            </th>

            <th className="px-5 py-3 text-left text-xs font-semibold uppercase  tracking-wider text-gray-500">
              Label
            </th>

            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
              Status
            </th>

            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
              Date
            </th>

            <th className="w-12"></th>
          </tr>
        </thead>

        <tbody>
          {rows.map((task) => (
            <tr
              key={task?.id}
              className="border-b border-gray-100 hover:bg-gray-50 transition-colors relative"
            >
              <td className="px-5 py-4">
                <p className="font-medium text-gray-900">{task?.title}</p>
              </td>

              <td className="px-5 py-4">
                <span className="rounded-full  bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                  {task?.label}
                </span>
              </td>

              <td className="px-5 py-4">
                <span
                  className={`
              inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold
              ${
                task?.status === "in-progress"
                  ? "bg-purple-100 text-purple-700"
                  : task?.status === "Done"
                  ? "bg-orange-100 text-orange-700"
                  : task?.status === "Todo"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-200 text-gray-700"
              }
            `}
                >
                  <span className="h-2 w-2 rounded-full bg-current"></span>
                  {task?.status}
                </span>
              </td>

              <td className="px-5 py-4 text-sm text-gray-500">  {task?.date}</td>
   
                <td className="px-5 py-4 text-right ">
                  <button
                    className="rounded-lg p-2 hover:bg-gray-100"
                    onClick={() => onMenuClick(task?.id)}
                  >
                    ⋮
                  </button>
                </td>

                {openMenuId === task?.id && (
                  <div className="absolute right-0 top-10 bg-white  shadow rounded-lg text-sm z-50">
                    <Button text="Düzenle" className="hover:text-white"/>

                  </div>
                )}
 
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
