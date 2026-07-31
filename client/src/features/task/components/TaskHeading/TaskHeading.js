import Button from "@/shared/components/atoms/Button"
export default function TaskHeading ({ title, description, className })  {
    return (
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

      <div className="mb-4">
        <h3 className={`text-lg font-bold ${className}`}>{title}</h3>
        <p className="text-gray-600 mt-1">{description}</p>
      </div>
             <Button
             text="+ Yeni Görev"
             onClick={() => setOpen(true)}
             className="w-full md:w-auto    hover:text-white"
           />      </header>
    );
  };
  