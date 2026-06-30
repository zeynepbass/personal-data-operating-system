import { FeedHeader, AiFooter } from "@/components/molecules";
import { Feed } from "@/components/organisms";
export default function Dashboard() {
  return (
    <>
      <div className="mx-auto ">
        <FeedHeader
          title="Günaydın, Zeynep! 👋"
          description="Bugün harika işler seni bekliyor."
        />

        <Feed />
        <AiFooter
          title="AI Önerileri"
          description="Bugün 3 görevin kaldı."
          info="React çalışmaya devam etmeni öneriyorum."
        />
      </div>
    </>
  );
}
