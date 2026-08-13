import GoalItem from "../GoalsItem"
  
  export default function GoalsCard  ({
    category,
    title,
    items
  })  {
    return (
      <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
        <p className={`text-sm font-semibold`}>
          {category}
        </p>
  
        <h2 className="mt-2 text-3xl font-bold text-[#555A8A]">
          {title}
        </h2>
  
        <div className="mt-6 flex items-center gap-5">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
            <div
              className={`h-full `}
     
            />
          </div>
  

        </div>
  
        <div className="mt-8 space-y-6">
          {items.map((item) => (
            <GoalItem
              key={item.title}
              {...item}

            />
          ))}
        </div>
      </div>
    );
  };