import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Skills from "@/sections/Skills";
import Projects from "@/sections/Projects";
import Experience from "@/sections/Experience";
import Certifications from "@/sections/Certifications";
import Services from "@/sections/Services";
import Contact from "@/sections/Contact";

/**
 * Home page. To reorder or hide a section, move or delete its line below.
 * Section content lives in src/data/*.ts — not here.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Certifications />
      <Services />
      <Contact />
    </>
  );
}
