import {
  Home,
  SquareCheck,
  FileText,
  File,
  Calendar,
  Target,
  BarChart3,
  Settings,
} from "lucide-react";
export const navigation = [
    { id: 1, name: "Ana Sayfa", icon: Home, href: "/dashboard" },
    { id: 2, name: "Görevler", icon: SquareCheck, href: "/tasks" },
    { id: 3, name: "Notlar", icon: FileText, href: "/notes" },
    { id: 4, name: "Dökümanlar", icon: File, href: "/documents" },
    { id: 5, name: "Takvim", icon: Calendar, href: "/calendar" },
    { id: 6, name: "Hedefler", icon: Target, href: "/goals" },
    { id: 7, name: "Analiz", icon: BarChart3, href: "/analytics" },
    { id: 8, name: "Ayarlar", icon: Settings, href: "/settings" },
  ];