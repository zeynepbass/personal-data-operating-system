import {Select,Input} from "@/shared/components/atoms"
import { useGoalCategories } from "../../hooks/useGoalCategories";

export function GoalFormBasic({ goal, onChange }) {
  const { data: categories = [] } = useGoalCategories();

  const categoryOptions = categories.map((category) => ({
    value: category.name,
    label: category.name,
  }));

  return (
    <div className=" p-4">
      <div className="mb-4">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Hedef
        </p>

        <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
          Hedef Bilgileri
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
     

          <Input type="text" name="title" value={goal.title} onChange={onChange} label="Başlık" placeholder="Başlık" />
        </div>
        <div>


          <Select name="category" value={goal.category} onChange={onChange} label="Kategori" placeholder="Kategori seç" options={categoryOptions} />
        </div>
        <div>


        </div>
      </div>
    </div>
  );
}