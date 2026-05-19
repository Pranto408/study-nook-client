import Banner from "@/components/homepage/Banner";
import FeaturedRooms from "@/components/homepage/FeaturedRooms";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Banner/>
      <FeaturedRooms/>
    </div>
  );
}
