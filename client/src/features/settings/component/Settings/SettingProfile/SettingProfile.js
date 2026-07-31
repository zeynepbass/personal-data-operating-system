"use client";

import Button  from "@/shared/components/atoms/Button";
import Input from "@/shared/components/atoms/Input";
import Textarea from "@/shared/components/atoms/Textarea";
import {Heading} from "@/shared/components/molecules";
export  const SettingProfile=() =>{
  return (
    <section className="space-y-8">

<Heading title=" Profil Bilgileri" />
   
<div className=" p-6 overflow-hidden rounded-2xl border bg-white border-gray-200 shadow-sm">

      <div className="mb-10 flex flex-wrap items-center gap-5">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-2xl font-bold text-white">
          ZK
        </div>
        <Button text=" Fotoğraf Değiştir" />
      </div>

      <form className="space-y-6">
        <Input
          label="Ad Soyad"
          className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition duration-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
        />

        <Input
          label="E-posta"
          className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition duration-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
          type="email"
        />

        <div>
          <Textarea label="Hakkımda" />
        </div>

        <div className="pt-2 text-center">
          <Button type="submit" text="Kaydet" />
        </div>
      </form>
    </div>    </section>
  );
}
