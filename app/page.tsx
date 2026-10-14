import Rail from "@/components/Rail";
import TopBar from "@/components/TopBar";
import Hero from "@/components/Hero";
import CommandPalette from "@/components/CommandPalette";
import {
  Profile, Experience, Database, Vault, BB84Section,
  OtherWork, Training, Skills, Contact,
} from "@/components/Sections";

export default function Page() {
  return (
    <>
      <TopBar />
      <div className="shell">
        <Rail />
        <main>
          <Hero />
          <Profile />
          <Experience />
          <Database />
          <Vault />
          <BB84Section />
          <OtherWork />
          <Training />
          <Skills />
          <Contact />
        </main>
      </div>
      <CommandPalette />
    </>
  );
}
