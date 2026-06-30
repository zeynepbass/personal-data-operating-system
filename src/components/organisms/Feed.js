import { Select, Input, Heading } from "@/components/atoms";
import { List } from "@/components/molecules";
export const Feed = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="bg-white rounded-2xl shadow p-5">
        <Heading title="Bugünkü Görevler" />

        <div className="space-y-3 ">
          <Input />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow p-5  ">
        <Heading title="Takvim" />

        <p className=" text-gray-600 mt-3">29 Haziran 2024 Cumartesi</p>

        <div className="mt-2 space-y-2 ">
          <div className="flex rounded-xl overflow-hidden border border-slate-200  ">
            <div className="bg-[#555A8A] text-white px-4 flex items-center font-semibold">
              10:00
            </div>

            <div className="flex justify-between items-center w-full px-4 py-3">
              <span>Meeting</span>

              <span className=" bg-green-100 text-green-700 px-2 py-1 rounded-full ">
                Tamamlandı
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow p-5 ">
      <div className="flex items-center justify-between mb-6 ">
        <Heading
          title="İstatistikler
"
        />
          
        <Select />
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-indigo-50 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-[#555A8A]">25</p>
            <p className=" text-gray-600 mt-1">Görev</p>
          </div>

          <div className="bg-green-50 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-green-600">4</p>
            <p className=" text-gray-600 mt-1">Hedef</p>
          </div>

          <div className="bg-orange-50 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-orange-500">12</p>
            <p className=" text-gray-600 mt-1">Saat</p>
          </div>
        </div>

        <div className="flex items-end justify-between h-32 px-2">
          <div className="flex flex-col items-center gap-2">
            <div className="w-6 h-12 rounded-full bg-[#555A8A]"></div>
            <span className=" text-gray-600">Pzt</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="w-6 h-20 rounded-full bg-[#555A8A]"></div>
            <span className=" text-gray-600">Sal</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="w-6 h-10 rounded-full bg-[#555A8A]"></div>
            <span className=" text-gray-600">Çar</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="w-6 h-16 rounded-full bg-[#555A8A]"></div>
            <span className=" text-gray-600">Per</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="w-6 h-8 rounded-full bg-[#555A8A]"></div>
            <span className=" text-gray-600">Cum</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="w-6 h-14 rounded-full bg-[#555A8A]"></div>
            <span className=" text-gray-600">Cmt</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="w-6 h-24 rounded-full bg-[#555A8A]"></div>
            <span className=" text-gray-600">Paz</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow p-5  ">
        <Heading title="Son Notlar" />

        <List />
      </div>
    </div>
  );
};
