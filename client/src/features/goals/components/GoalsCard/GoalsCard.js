import GoalItem from "../GoalsItem";
import { useState } from "react";
import { Pencil, Trash } from "lucide-react";
import { Button } from "@/shared/components/atoms";
export default function GoalsCard({
  category,
  title,
  id,
  items = [],
  setSelectedValue,
  selectedValue,
  deletedGoals,
  isUpdating,
  updateGoals,
  openMenu, setOpenMenu,
 

}) {

  const [localItems, setLocalItems] = useState(items);

  const handleItemChange = (index, value) => {
    setLocalItems((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              value,
            }
          : item
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    updateGoals({
      id: selectedValue,
      data: localItems,
    });
  };
  const handleMenuClick = (id) => {
    setOpenMenu((prev) => (prev === id ? null : id));
  };

  return (
    <div className="relative rounded-3xl border border-gray-100 dark:border-white/10 bg-white dark:bg-[#1a1a22] p-6 shadow-sm">
      {" "}
      <div className="flex items-center justify-between">
        {" "}
        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100"> {category} </p>{" "}
        <button
          type="button"
          aria-label="Goal menüsünü aç"
          onClick={() => handleMenuClick(id)}
          className="rounded-lg p-2 text-gray-500 dark:text-gray-400 transition-colors hover:bg-gray-100 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-gray-100"
        >
          {" "}
          ⋮{" "}
        </button>{" "}
        {openMenu===id && (
          <div className="absolute right-4 top-14 z-50 min-w-[120px] overflow-hidden rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-[#232330] py-1 text-sm shadow-lg">
            {" "}
            <button
              type="button"
              onClick={() => {
                console.log("Edit goal:", id);
                setSelectedValue(id);
                setOpenMenu(false);
              }}
              className="flex w-full items-center gap-2 px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10"
            >
              {" "}
              <Pencil size={16} /> Düzenle{" "}
            </button>{" "}
            <button
              type="button"
              onClick={() => {
                console.log(id);
                deletedGoals(id);

                setOpenMenu(false);
              }}
              className="flex w-full items-center gap-2 px-4 py-2 text-left text-[#7d78ce] hover:bg-gray-100 dark:hover:bg-white/10"
            >
              {" "}
              <Trash size={16} /> Sil{" "}
            </button>{" "}
          </div>
        )}{" "}
      </div>{" "}
      <h2 className="mt-2 text-3xl font-bold text-[#555A8A] dark:text-[#a5a1e8]"> {title} </h2>{" "}
      <div className="mt-6 flex items-center gap-5">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100 dark:bg-white/10">
          {" "}
          <div className="h-full" />{" "}
        </div>{" "}
      </div>{" "}
      <div className="mt-8 space-y-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-3">
            {localItems.map((item, index) => (
              <GoalItem
                key={item.title}
                title={item.title}
                value={item.value}
                selectedValue={selectedValue}
                onChange={(value) => handleItemChange(index, value)}
              />
            ))}
          </div>

          {selectedValue && (
            <div className="mt-4 flex justify-center">
              <Button
                type="submit"
                disabled={isUpdating}
                text={isUpdating ? "Güncelleniyor..." : "Görevi Düzenle"}
                className="rounded-xl px-6 py-3 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>
          )}
        </form>
      </div>{" "}
    </div>
  );
}
