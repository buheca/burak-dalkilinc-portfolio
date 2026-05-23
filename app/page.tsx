import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <About />
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <Projects />
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
