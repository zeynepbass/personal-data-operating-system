import { Button, Input } from "@/shared/components/atoms";
import { Trash } from "lucide-react";
export function GoalFormItems({ items, onChange }) {
  const handleAdd = () => {
    onChange([
      ...items,
      {
        title: "",
        value: "",
      },
    ]);
  };

  const handleChange = (index, field, value) => {
    const updatedItems = [...items];

    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value,
    };

    onChange(updatedItems);
  };

  const handleRemove = (index) => {
    const updatedItems = items.filter((_, itemIndex) => itemIndex !== index);

    onChange(updatedItems);
  };

  return (
    <div className=" p-4">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-500">Hedef Maddeleri</p>

          <h2 className="text-sm font-semibold text-gray-700">
            Hedef İçerikleri
          </h2>
        </div>

        <Button
          type="button"
          text="+ Ekle"
          onClick={handleAdd}
          className="rounded-lg bg-gray-100 px-4 py-2 text-sm text-gray-700"
        />
      </div>

      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex  gap-3  rounded-xl border border-gray-200 p-3"
          >
            <div className="w-full">
            <Input
              type="text"
              value={item.title}
              onChange={(event) =>
                handleChange(index, "title", event.target.value)
              }
              placeholder="Hedef maddesi"
          
  
            /></div>
            <Input
              type="number"
              value={item.value}
                                  min="0"
              onChange={(event) =>
                handleChange(index, "value", Number(event.target.value))
              }
              placeholder="Değer"
              className="w-28"
            />
            <div className="flex items-center">
              {" "}
              <Trash
                width="20"
                height="20"
                className="cursor-pointer"
                onClick={() => handleRemove(index)}
              />{" "}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
