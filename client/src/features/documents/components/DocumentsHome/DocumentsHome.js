"use client";

import {
  FileText,
  FileCode,
  FileImage,
  FileSpreadsheet,
  FileArchive,
  Search,
  Trash,
} from "lucide-react";

import { PageHeader, Modal } from "@/shared/components/molecules";
import {
  Button,
  Input,
  Select
} from "@/shared/components/atoms";

const iconMap = {
  pdf: <FileText size={46} className="text-red-500" />,
  doc: <FileText size={46} className="text-blue-600" />,
  ppt: <FileSpreadsheet size={46} className="text-orange-500" />,
  image: <FileImage size={46} className="text-[#555A8A]" />,
  json: <FileCode size={46} className="text-gray-500" />,
  zip: <FileArchive size={46} className="text-yellow-500" />,
};

export default function DocumentsHome({
  data,
  search,
  createDocument,
  isCreating,
  setSearch,
  open,
  setOpen,
  filter,
  setFilter,
  handleDelete,
}) {
  return (

    <section className="flex flex-col gap-6 h-[80vh] overflow-scroll bg-white p-5 shadow-sm rounded-2xl ">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <PageHeader
          title="Belgelerim"
          description="Belgelerinizi görüntüleyin ve yönetin."
        />

        <Button
          text="+ Belge yükle"
          onClick={() => setOpen(true)}
          className="w-full md:w-auto hover:text-white text-gray-50"
        />

        <Modal
          open={open}
          setOpen={setOpen}
          isCreating={isCreating}
          onSubmit={createDocument}
        />
      </div>

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center ">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <Input
            type="text"
            placeholder="Belge ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white py-2 pl-11  text-sm outline-none transition focus:border-[#555A8A] focus:ring-2 focus:ring-[#555A8A]/20"
          />
        </div>

        <div className="w-full lg:w-40">
          <Select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Tümü"
            options={[
              {
                value: "old",
                label: "Eskiden Yeniye",
              },
              {
                value: "new",
                label: "Yeniden Eskiye",
              },
            ]}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
        {data?.map((doc) => (
          <div
            key={doc.id}
            className="group cursor-pointer  border border-gray-200 duration-300
             hover:-translate-y-1 hover:border-[rgb(125,120,206)]
                   rounded-2xl bg-white p-5 shadow transition hover:shadow-lg
             "
          >
            {" "}
            <span className="flex justify-end cursor-pointer">
              <Trash
                width={15}
                height={15}
                color="#7d78ce"
                onClick={() => {
                  handleDelete(doc.id);
                }}
              />
            </span>
            <div
  className="mb-6 flex justify-center cursor-pointer transition group-hover:scale-105"
  onClick={() => {

    window.open(
      `http://localhost:5209${doc.pdf}`,
      "_blank"
    );
  }}
>
  {iconMap[doc.icon]}
</div>
            <h3 className="truncate text-sm font-semibold text-gray-800">
              {doc.name}
            </h3>
            <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
              <span>{doc.size}</span>
              <span>{doc.date}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
