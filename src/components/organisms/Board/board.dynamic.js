
import dynamic from "next/dynamic";
export const ListView = dynamic(
  () => import("@/components/molecules").then((mod) => mod.ListView),
  {
    loading: () => <div className="py-10 text-center">Yükleniyor...</div>,
  }
);

export const TableView = dynamic(
  () => import("@/components/molecules").then((mod) => mod.TableView),
  {
    loading: () => <div className="py-10 text-center">Yükleniyor...</div>,
  }
);

export const Column = dynamic(
  () => import("@/components/molecules").then((mod) => mod.Column),
  {
    loading: () => <div className="py-10 text-center">Kanban yükleniyor...</div>,
  }
);

export const Modal = dynamic(
  () => import("@/components/molecules").then((mod) => mod.Modal)
);
