// ============================================================
// HOME PAGE — urutan section halaman. Hero+About dibungkus div
// untuk sticky/pin behavior; Skills, Projects, Contact menyusul.
// ============================================================
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <div className="relative [scroll-snap-type:y_proximity]">
        <Hero />
        <About />
      </div>
      <Skills />
      <Projects />
      <Contact />
    </>
  );
}
