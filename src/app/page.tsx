import Hero from "@/sections/Hero";
import Projects from "@/sections/Projects";
import About from "@/sections/About";
import Services from "@/sections/Services";
import Process from "@/sections/Process";
import Skills from "@/sections/Skills";
import Experience from "@/sections/Experience";
import Certifications from "@/sections/Certifications";
import GitHub from "@/sections/GitHub";
import Contact from "@/sections/Contact";

/**
 * Home page. To reorder or hide a section, move or delete its line below
 * (and update navLinks in src/data/site.ts to match).
 * Section content lives in src/data/*.ts — not here.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Projects />
      <About />
      <Services />
      <Process />
      <Skills />
      <Experience />
      <Certifications />
      <GitHub />
      <Contact />
    </>
  );
}
