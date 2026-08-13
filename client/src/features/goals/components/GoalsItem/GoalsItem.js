
export default function GoalItem ({ title, value }) {
    return(
        <div className="grid grid-cols-[24px_1fr_160px_45px] items-center gap-4">
        <div className={`h-4 w-4 rounded-full border-2 `} />
    
        <span className="text-sm font-medium text-gray-700">
          {title}
        </span>
    
        <div className="h-1.5 rounded-full bg-gray-100">
          <div
            className={`h-full rounded-full`}
            style={{ width: `${value}%` }}
          />
        </div>
    
        <span className="text-sm font-semibold text-gray-500">
          {value}%
        </span>
      </div>
    )
}

  