import  Select  from "@/shared/components/atoms/Select";
export default function DashboardDuration(){
    return(
        <div className="w-full md:w-52">
        <Select
          name="durationType"
          value=""
          onChange={() => {}}
          placeholder="Zaman Birimi"
          options={[
            { value: "day", label: "Gün" },
            { value: "month", label: "Ay" },
            { value: "year", label: "Yıl" },
          ]}
        />
      </div>
    )
}