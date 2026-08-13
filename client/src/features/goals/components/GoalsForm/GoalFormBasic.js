export function GoalFormBasic({ goal, onChange }) {
  return (
    <div className=" p-4">
      <div className="mb-4">
        <p className="text-xs text-gray-400">
          Hedef
        </p>

        <h2 className="text-sm font-semibold text-gray-700">
          Hedef Bilgileri
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Hedef ID
          </label>

          <input
            type="number"
            name="id"
            value={goal.id}
            onChange={onChange}
            placeholder="Hedef ID"
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-[#555A8A]"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Durum
          </label>

          <select
            name="status"
            value={goal.status}
            onChange={onChange}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-[#555A8A]"
          >
            <option value="active">
              Aktif
            </option>

            <option value="completed">
              Tamamlandı
            </option>
          </select>
        </div>
      </div>
    </div>
  );
}