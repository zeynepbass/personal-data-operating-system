"use client"
import {Button} from "@/shared/components/atoms";
import {PageHeader} from "@/shared/components/molecules"
import {useRouter} from "next/navigation"
export default function TaskHeading({
  title,
  description,

}) {
  const router=useRouter();
  return (
    <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="mb-4">
  <PageHeader
                  title={title}
                  description={description}
                />
 
      </div>
      <Button
        text="+ Yeni Görev"
        onClick={() => router.push("/goals/add")}
        className="w-full md:w-auto hover:text-white text-gray-50"
      />{" "}
    </header>
  );
}
