import Image from "next/image";

import { PageHeader } from "@/shared/components/molecules";

export default function AuthShell({ badge, headline, tagline, title, description, children }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-12">
      <div className="relative hidden min-h-screen overflow-hidden lg:col-span-5 lg:block">
        <Image
          src="/assets/images/login.jpg"
          alt=""
          fill
          priority
          sizes="(min-width: 1024px) 42vw, 0px"
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-black/20" />

        <div className="absolute bottom-10 left-10 max-w-md text-white">
          <div className="mb-4 inline-flex items-center rounded-full bg-white/15 px-4 py-2 text-sm backdrop-blur-md">
            {badge}
          </div>

          <h2 className="text-3xl font-bold leading-tight">{headline}</h2>

          <p className="mt-4 text-sm leading-6 text-white/80">{tagline}</p>
        </div>
      </div>

      <div className="flex min-h-screen items-center justify-center bg-[#FAFAFA] px-6 py-12 lg:col-span-7">
        <div className="w-full max-w-lg">
          <PageHeader title={title} description={description} />
          {children}
        </div>
      </div>
    </div>
  );
}
