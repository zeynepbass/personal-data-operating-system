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
  updateGoals
}) {
  const [openMenu, setOpenMenu] = useState(false);
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
  id:selectedValue,
  data:localItems
})

  };

  return (
    <div className="relative rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
      {" "}
      <div className="flex items-center justify-between">
        {" "}
        <p className="text-sm font-semibold"> {category} </p>{" "}
        <button
          type="button"
          aria-label="Goal menüsünü aç"
          onClick={() => setOpenMenu((prev) => !prev)}
          className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
        >
          {" "}
          ⋮{" "}
        </button>{" "}
        {openMenu && (
          <div className="absolute right-4 top-14 z-50 min-w-[120px] overflow-hidden rounded-lg border border-gray-200 bg-white py-1 text-sm shadow-lg">
            {" "}
            <button
              type="button"
              onClick={() => {
                console.log("Edit goal:", id);
                setSelectedValue(id);
                setOpenMenu(false);
              }}
              className="flex w-full items-center gap-2 px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
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
              className="flex w-full items-center gap-2 px-4 py-2 text-left text-[#7d78ce] hover:bg-gray-100"
            >
              {" "}
              <Trash size={16} /> Sil{" "}
            </button>{" "}
          </div>
        )}{" "}
      </div>{" "}
      <h2 className="mt-2 text-3xl font-bold text-[#555A8A]"> {title} </h2>{" "}
      <div className="mt-6 flex items-center gap-5">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
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
            
            onChange={(value) =>
              handleItemChange(index, value)
            }
          />
        ))}
      </div>

      {selectedValue && (
        <div className="mt-4 flex justify-center">
          <Button
            type="submit"
            disabled={isUpdating}
            text={
              isUpdating
                ? "Güncelleniyor..."
                : "Görevi Düzenle"
            }
            className="rounded-xl bg-[#555A8A] px-6 py-3 text-gray-50 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
          />
        </div>
      )}
    </form>
      </div>{" "}
    </div>
  );
}
