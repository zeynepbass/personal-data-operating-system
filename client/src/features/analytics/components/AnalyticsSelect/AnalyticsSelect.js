import {

  Select
} from "@/shared/components/atoms";

export default function AnalyticsSelect({  options,
  value,
  onChange}){
  return(
    <div className="m-w-md">
<Select
   onChange={(e) => onChange(e.target.value)}
 value={value}
  text="Filtrele"
  name="type"
  placeholder="Filtrele"
  options={options}
/>{" "}
</div>
  )
}