import {Select,Input} from "@/shared/components/atoms"
export function GoalFormBasic({ goal, onChange }) {
  return (
    <div className=" p-4">
      <div className="mb-4">
        <p className="text-xs text-gray-500">
          Hedef
        </p>

        <h2 className="text-sm font-semibold text-gray-700">
          Hedef Bilgileri
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
     

          <Input type="text" name="title" value={goal.title} onChange={onChange} label="Başlık" placeholder="Başlık" />
        </div>
        <div>


          <Select name="category" value={goal.category} onChange={onChange} label="Kategori" placeholder="Kategori seç" options={[ { value: "2026-goals", label: "2026 Hedefleri", }, { value: "personal-goals", label: "Kişisel Hedefler", }, { value: "2027-goals", label: "2027 Hedefleri", }, { value: "work-goals", label: "İş Hedefleri", }, ]} />
        </div>
        <div>


        </div>
      </div>
    </div>
  );
}