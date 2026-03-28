import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom"

// --- PAGE COMPONENTS (Placeholders for now) ---
function Landing() {
  return (
    <div className="p-6 md:p-12 animate-in fade-in duration-500">
      <h1 className="text-2xl font-mono tracking-tighter border-b border-neutral-800 pb-2">
        // ROOT
      </h1>
      <p className="mt-4 text-neutral-500">System initialized. Awaiting commands.</p>
    </div>
  )
}

function Resume() {
  return (
    <div className="p-6 md:p-12 animate-in fade-in duration-500">
      <h1 className="text-2xl font-mono tracking-tighter border-b border-neutral-800 pb-2">
        ~/RESUME
      </h1>
      <p className="mt-4 text-neutral-500">Experience and technical stack.</p>
    </div>
  )
}

function Spotify() {
  return (
    <div className="p-6 md:p-12 animate-in fade-in duration-500">
      <h1 className="text-2xl font-mono tracking-tighter border-b border-neutral-800 pb-2">
        ~/MUSIC_FEED
      </h1>
      <p className="mt-4 text-neutral-500">API connection pending...</p>
    </div>
  )
}

// --- NAVBAR COMPONENT ---
function Navbar() {
  // Utility for active link styling
  const navClass = ({ isActive }: { isActive: boolean }) => 
    `text-sm font-mono transition-colors hover:text-lime-400 ${
      isActive ? "text-lime-400" : "text-neutral-500"
    }`

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-md">
      <div className="flex h-14 items-center justify-between px-6">
        
        {/* Brand */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold tracking-tighter text-neutral-50">
            IGGY_Garcia
          </span>
          <span className="text-neutral-700">|</span>
        </div>

        {/* Navigation Links */}
        <nav className="flex items-center gap-6">
          <NavLink to="/" className={navClass} end>
            /root
          </NavLink>
          <NavLink to="/resume" className={navClass}>
            /resume
          </NavLink>
          <NavLink to="/spotify" className={navClass}>
            /spotify
          </NavLink>
        </nav>

      </div>
    </header>
  )
}

// --- MAIN APP ---
export default function App() {
  return (
    <Router>
      <div className="w-full min-h-screen bg-neutral-950 text-neutral-50 selection:bg-lime-400 selection:text-black">
        <Navbar />
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