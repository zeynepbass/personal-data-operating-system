import Link from "next/link";

export function MenuList({ href, className, icon: Icon, item }) {
  return (
    <Link  href={href} className={className}>
      <div className="flex items-center gap-4" >
        <Icon className="h-5 w-5" />
        <span>{item}</span>
      </div>
    </Link>
  );
}
