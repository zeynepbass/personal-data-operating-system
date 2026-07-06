import Link from "next/link";

export function MenuList({ href, key,className, icon: Icon, item }) {
  console.log("MenuList render:", href);
  return (
    <Link key={key} href={href} className={className}>
      <div className="flex items-center gap-4">
        <Icon className="h-5 w-5" />
        <span>{item}</span>
      </div>
    </Link>
  );
}