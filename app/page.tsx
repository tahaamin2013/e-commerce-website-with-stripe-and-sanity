import Hero from "@/components/Hero";
import Newest from "@/components/Newest";

export default function Home() {
  return (
   <div className="bg-white pb-6 sm:pb-0 lg:pb-12">
    <Hero />
    <Newest />
    </div>
  );
}
