import {

  Select
} from "@/shared/components/atoms";

export default function AnalyticsSelect({options}){
  return(
    <div className="m-w-md">
<Select
  text="Filtrele"
  name="type"
  placeholder="Filtrele"
  options={options}
/>{" "}
</div>
  )
}