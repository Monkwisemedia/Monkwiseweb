import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Brands from "@/components/Brands";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Cursor from "@/components/Cursor";
import FullPageScroll from "@/components/FullPageScroll";
import { ScrollProvider } from "@/context/ScrollContext";

export default function Home() {
  return (
    <ScrollProvider>
      <Cursor />
      <Navbar />
      <FullPageScroll>
        <div className="w-full h-full"><Hero /></div>
        <div className="w-full h-full"><Brands /></div>
        <div className="w-full h-full"><Services /></div>
        <div className="w-full h-full"><Portfolio /></div>
        <div className="w-full h-full"><Process /></div>
        <div className="w-full h-full"><Testimonials /></div>
        <div className="w-full h-full"><Contact /></div>
      </FullPageScroll>
    </ScrollProvider>
  );
}
