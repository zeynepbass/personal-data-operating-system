"use client"
import {
    Draggable
} from "@hello-pangea/dnd";

import {
    Calendar,
    GripVertical
} from "lucide-react";

export const TaskCard=({
    task,
    index,
}) =>{

    return (

        <Draggable
        draggableId={String(task.id)}
        index={index}

        >

            {(provided)=>(
                <article
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="
                    bg-white
                    rounded-xl
                    p-4
                    shadow-sm
                
                    cursor-grab
                    active:cursor-grabbing
                    hover:shadow-md
                    transition
                "
                >

                    <GripVertical
                        size={18}
                        className="text-gray-400 mb-3"
                    />

                    <h4 className="font-bold">
                        {task.title}
                    </h4>

                    <span
                        className="
                        inline-flex
                        mt-4
                        rounded-lg
                        bg-indigo-100
                        text-indigo-700
                        px-3
                        py-1
                        text-xs
                    "
                    >
                        {task.label}
                    </span>

                    <div className="flex items-center justify-end gap-2 mt-5 text-gray-500 text-sm">

            
         <Calendar size={15}/>

                        {task.date}              
                    </div>

                </article>
            )}

        </Draggable>

    );

}