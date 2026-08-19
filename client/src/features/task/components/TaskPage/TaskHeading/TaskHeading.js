import { Button } from "@/shared/components/atoms";
import { PageHeader } from "@/shared/components/molecules";
export default function TaskHeading({ title, description, setOpen,isAdmin }) {


  return (
    <header className="flex flex-col gap-4 md:flex-row py-4 md:items-center md:justify-between">
      <PageHeader title={title} description={description} />
      {isAdmin &&  (
              <Button
        text="+ Yeni Görev"
        onClick={() => setOpen(true)}
        className="w-full md:w-auto hover:text-white text-gray-50"
      />
      )}
   
    </header>
  );
}
