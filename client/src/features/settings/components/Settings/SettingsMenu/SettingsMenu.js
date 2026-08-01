
import Link from "next/link";
export default function SettingsMenu({href,item,className, icon:Icon}){
    return(
        <Link  href={href} className={className}>
        <div className="flex items-center gap-4" >
          <Icon className="h-5 w-5" />
          <span>{item}</span>
        </div>
      </Link>
    )
}