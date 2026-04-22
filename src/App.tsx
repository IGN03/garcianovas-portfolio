import { HashRouter as Router, Routes, Route, Link } from "react-router-dom"
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar"
import Resume from "./pages/Resume"
import Spotify from "./pages/Spotify"





function Landing() {
  return (
    <div className="p-6 md:p-12 animate-in fade-in duration-500">
      <h1 className="text-2xl font-mono tracking-tighter border-b border-neutral-800 pb-2">
        // ROOT
      </h1>
      <p className="mt-4 text-neutral-500">Welcome to garcianovas.dev</p>
    </div>
  )
}

// function Spotify() {
//   return (
//     <div className="p-6 md:p-12 animate-in fade-in duration-500">
//       <h1 className="text-2xl font-mono tracking-tighter border-b border-neutral-800 pb-2">
//         ~/MUSIC_FEED
//       </h1>
//       <p className="mt-4 text-neutral-500">Spotify API connection pending...</p>
//     </div>
//   )
// }

export default function App() {
  return (
    <Router>
      <div className="w-full min-h-screen bg-neutral-950 text-neutral-50 selection:bg-lime-400 selection:text-black">
        
        {/* The Shadcn Menubar Navigation */}
        <div className="sticky top-0 z-50 w-full border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-md p-2 flex justify-center">
          <Menubar className="border-neutral-800 bg-neutral-900 text-neutral-300">
            <MenubarMenu>
              <Link to="/"><MenubarTrigger className="cursor-pointer hover:text-lime-400">/root</MenubarTrigger></Link>
            </MenubarMenu>
            <MenubarMenu>
              <Link to="/resume"><MenubarTrigger className="cursor-pointer hover:text-lime-400">/resume</MenubarTrigger></Link>
            </MenubarMenu>
            <MenubarMenu>
              <Link to="/spotify"><MenubarTrigger className="cursor-pointer hover:text-lime-400">/spotify</MenubarTrigger></Link>
            </MenubarMenu>
            <MenubarMenu>
              <a href="https://ign03.github.io" rel="noopener noreferrer">
                <MenubarTrigger className="cursor-pointer hover:text-lime-400">/ign03.github.io</MenubarTrigger>
              </a>
            </MenubarMenu>
            <MenubarMenu>
              <a href="https://www.linkedin.com/in/ignacio-garcia-novas-167193255/" rel="noopener noreferrer">
                <MenubarTrigger className="cursor-pointer hover:text-lime-400">/linkedin</MenubarTrigger>
              </a>
            </MenubarMenu>
            <MenubarMenu>
              <a href="https://github.com/IGN03" rel="noopener noreferrer">
                <MenubarTrigger className="cursor-pointer hover:text-lime-400">/github</MenubarTrigger>
              </a>
            </MenubarMenu>
            <MenubarMenu>
            <a href="contact.vcf" download="contact.vcf">
                <MenubarTrigger className="cursor-pointer hover:text-lime-400">/contact.vcf</MenubarTrigger>
              </a>
            </MenubarMenu>

          </Menubar>
        </div>

        <main className="w-full">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/spotify" element={<Spotify />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}