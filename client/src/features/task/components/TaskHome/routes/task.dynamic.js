
import dynamic from "next/dynamic";
export const TaskList = dynamic(
  () => import("../../TaskList"),  {
    loading: () => (
      <div className="py-10 text-center">
        Yükleniyor...
      </div>
    ),
  }
);
export const TaskColumn = dynamic(
  () => import("@/shared/components/organisms/Column"),
  {
    loading: () => <div className="py-10 text-center">        Yükleniyor...</div>,
  }
);
export const TaskView = dynamic(
  () => import("../../TaskView"),  {
    loading: () => (
      <div className="py-10 text-center">
        Yükleniyor...
      </div>
    ),
  }
);

export const TaskModal = dynamic(
  () => import("../../TaskModal"),
  {
    loading: () => (
      <div className="py-10 text-center">
        Yükleniyor...
      </div>
    ),
  }
);