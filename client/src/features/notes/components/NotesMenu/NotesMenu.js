"use client"
import {
  Bot,
  Blocks,
  BriefcaseBusiness,
  Code2,
  ServerCog,
  Component,
  Database,
  Cpu,
  Brain,
  GitBranch,
  FolderKanban,
  BookOpen,
  LayoutDashboard,
  Layers3,
  ChevronDown, ChevronRight 
} from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import  NotesMenuList  from "../NotesMenuList";



export const menu = [
  {
    id: 1,
    name: "Frontend",
    icon: Code2,
    children: [
      {
        id: 11,
        name: "HTML & CSS",
        icon: LayoutDashboard,
        link: "/notes/frontend/html-css",
      },
      {
        id: 12,
        name: "JavaScript",
        icon: BookOpen,
        link: "/notes/frontend/javascript",
      },
      {
        id: 13,
        name: "React",
        icon: Component,
        link: "/notes/frontend/react",
      },
      {
        id: 14,
        name: "Next.js",
        icon: Layers3,
        link: "/notes/frontend/nextjs",
      },
      {
        id: 15,
        name: "Performance",
        icon: Cpu,
        link: "/notes/frontend/performance",
      },
    ],
  },

  {
    id: 2,
    name: "Backend",
    icon: ServerCog,
    children: [
      {
        id: 21,
        name: "Node.js",
        icon: ServerCog,
        link: "/notes/backend/nodejs",
      },
      {
        id: 22,
        name: "Express",
        icon: GitBranch,
        link: "/notes/backend/express",
      },
      {
        id: 23,
        name: "MongoDB",
        icon: Database,
        link: "/notes/backend/mongodb",
      },
      {
        id: 24,
        name: "Authentication",
        icon: FolderKanban,
        link: "/notes/backend/auth",
      },
    ],
  },

  {
    id: 3,
    name: "AI",
    icon: Bot,
    children: [
      {
        id: 31,
        name: "Prompt Engineering",
        icon: Brain,
        link: "/notes/ai/prompts",
      },
      {
        id: 32,
        name: "LLM",
        icon: Bot,
        link: "/notes/ai/llm",
      },
      {
        id: 33,
        name: "Agents",
        icon: Cpu,
        link: "/notes/ai/agents",
      },
      {
        id: 34,
        name: "RAG",
        icon: Database,
        link: "/notes/ai/rag",
      },
    ],
  },

  {
    id: 4,
    name: "Career",
    icon: BriefcaseBusiness,
    children: [
      {
        id: 41,
        name: "CV",
        icon: BookOpen,
        link: "/notes/career/cv",
      },
      {
        id: 42,
        name: "Interview",
        icon: BriefcaseBusiness,
        link: "/notes/career/interview",
      },
      {
        id: 43,
        name: "Portfolio",
        icon: LayoutDashboard,
        link: "/notes/career/portfolio",
      },
    ],
  },

  {
    id: 5,
    name: "Design Pattern",
    icon: Blocks,
    children: [
      {
        id: 51,
        name: "SOLID",
        icon: Blocks,
        link: "/notes/design-pattern/solid",
      },
      {
        id: 52,
        name: "Factory",
        icon: Component,
        link: "/notes/design-pattern/factory",
      },
      {
        id: 53,
        name: "Observer",
        icon: GitBranch,
        link: "/notes/design-pattern/observer",
      },
      {
        id: 54,
        name: "Repository",
        icon: Database,
        link: "/notes/design-pattern/repository",
      },
    ],
  },
];
export default function NotesMenu() {
  const pathname = usePathname();

  const [openMenu, setOpenMenu] = useState(1); 

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[240px_1fr]">

    <aside className="space-y-2">
      {menu.map((item) => {
        const isOpen = openMenu === item.id;

        return (
          <div key={item.id}>

            <button
              onClick={() =>
                setOpenMenu(isOpen ? null : item.id)
              }
              className="flex w-full items-center justify-between rounded-lg px-4 py-3 hover:bg-gray-100"
            >
              <div className="flex items-center gap-3">
                <item.icon size={18} />
                <span className="font-medium">{item.name}</span>
              </div>

              {isOpen ? (
                <ChevronDown size={18} />
              ) : (
                <ChevronRight size={18} />
              )}
            </button>

   
            {isOpen && (
              <div className="ml-6 mt-2 space-y-1 border-l border-gray-200 pl-4">
                {item.children.map((child) => (
                  <NotesMenuList
                    key={child.id}
                    href={child.link}
                    icon={child.icon}
                    item={child.name}
                    className={`flex items-center text-gray-500 gap-3 rounded-lg px-3 py-2 transition ${
                      pathname === child.link
                        ? "bg-violet-50 text-[#555A8A]"
                        : "hover:bg-gray-100"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </aside>

        </div>
      </div>
    </div>
  );
}
