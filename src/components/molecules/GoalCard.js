const GoalItem = ({ title, value, color }) => (
    <div className="grid grid-cols-[24px_1fr_160px_45px] items-center gap-4">
      <div className={`h-4 w-4 rounded-full border-2 ${color}`} />
  
      <span className="text-sm font-medium text-gray-700">
        {title}
      </span>
  
      <div className="h-1.5 rounded-full bg-gray-100">
        <div
          className={`h-full rounded-full ${color.replace("border", "bg")}`}
          style={{ width: `${value}%` }}
        />
      </div>
  
      <span className="text-sm font-semibold text-gray-500">
        {value}%
      </span>
    </div>
  );
  
  export const GoalCard = ({
    category,
    title,
    progress,
    color,
    items,
  }) => {
    return (
      <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
        <p className={`text-sm font-semibold ${color}`}>
          {category}
        </p>
  
        <h2 className="mt-2 text-3xl font-bold text-[#555A8A]">
          {title}
        </h2>
  
        <div className="mt-6 flex items-center gap-5">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
            <div
              className={`h-full ${color.replace(
                "text",
                "bg"
              )}`}
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
  
          <span className="text-lg font-bold text-[#555A8A]">
            {progress}%
          </span>
        </div>
  
        <div className="mt-8 space-y-6">
          {items.map((item) => (
            <GoalItem
              key={item.title}
              {...item}
              color={color.replace("text", "border")}
            />
          ))}
        </div>
      </div>
    );
  };