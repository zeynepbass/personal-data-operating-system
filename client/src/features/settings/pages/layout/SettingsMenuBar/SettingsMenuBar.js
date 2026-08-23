"use client";


import { User, Bell, Globe, Shield} from "lucide-react";
import SettingHeading from "../../../components/Settings/SettingsHeading"
import SettingsMenu from "../../../components/Settings/SettingsMenu"
import { usePathname } from "next/navigation";
const menu = [
  {id:1, name: "Profil", icon: User, link: "/settings" },
  { id:5,name: "Güvenlik", icon: Shield, link: "/settings/security" },

];
export default function SettingsMenuBar() {
  const pathname = usePathname();

  return (
    
   

       
      <div className="">
      <SettingHeading title="Ayarlar" />

        <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
       
        <aside className="p-2 bg-white border border-gray-200 rounded-2xl ">
               {menu.map((item) => {
                 const isActive = pathname === item.link;

                 return (
                 <SettingsMenu
                 key={item.id}
                 href={item.link}

                 className={`flex w-full items-left gap-4 rounded-xl
                   p-4 text-left transition-all duration-200
                                       ${
                                         isActive
                                           ? "bg-violet-50 text-[#555A8A] shadow-sm"
                                           : "text-gray-600 hover:bg-gray-100"
                                       }`}
                 icon={item.icon}
                 item={item.name}
                 />
     
                 );
               })}
             </aside>

       
        </div>
      </div>

  );
}
