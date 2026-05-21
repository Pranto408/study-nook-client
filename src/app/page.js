import Banner from "@/components/homepage/Banner";
import FeaturedRooms from "@/components/homepage/FeaturedRooms";
import FeaturesGrid from "@/components/homepage/FeaturesGrid";
import HowItWorks from "@/components/homepage/HowItWorks";
export const metadata = {
  title: "StudyNook – Home",
  description: "Book your library study rooms instantly.",
};
export default function Home() {
  return (
    <div>
      <Banner/>
      <FeaturedRooms />
      <FeaturesGrid />
      <HowItWorks/>
    </div>
  );
}
