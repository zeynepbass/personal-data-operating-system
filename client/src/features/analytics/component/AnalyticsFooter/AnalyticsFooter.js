import { Circle, Info } from "lucide-react";
export const AiFooter=({title,description,info
})=>{
    return(
        <div className="mt-6 rounded-3xl flex justify-between shadow-xl">
        <div className="p-8">
          <h2 className="text-xl font-bold text-gray-600"> AI Önerileri</h2>

          <p className="mt-3 opacity-90 flex items-center gap-2">
            <Circle width={15} height={15} color="gray" />
         
            {description}
          </p>

          <p className="mt-3 opacity-90 flex items-center gap-2">
            <Info width={15} height={15} color="orange" />
            {info}
          </p>
        </div>

        <div className="flex items-end">
          <img src="/images/ai.png" width={200} height={200} />
        </div>
      </div>
    )
}