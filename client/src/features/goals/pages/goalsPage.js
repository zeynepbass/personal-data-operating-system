
import GoalsHome from "../components/GoalsHome"
import Data from "@/shared/mocks/goals.json"
export default function GoalsPage() {
  return <GoalsHome item={Data}/>
}