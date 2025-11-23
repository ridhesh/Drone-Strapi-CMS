import About from "@/components/About";
import GetInTouch from "@/components/GetIntouch";
import Hero from "@/components/Hero";
import Highlights from "@/components/Highlights";
import ProductCards from "@/components/Product";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Hero />
      <About />
      <ProductCards />
      <Highlights />
      <GetInTouch />
    </main>
  );
}