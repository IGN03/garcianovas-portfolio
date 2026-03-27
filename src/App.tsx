export default function App() {
  return (
    // This outer div ensures the background is dark and fills the whole screen
    <div className="min-h-screen w-full bg-neutral-950 text-neutral-50 p-8 selection:bg-lime-400 selection:text-black">
      
      {/* This is your workspace. Tell me what to put here! */}
      <div className="max-w-auto mx-auto">
        <h1 className="text-2xl font-mono tracking-tighter">garcianovas.dev_</h1>
        <p className="text-neutral-500 mt-2 text-sm">System initialized. Waiting for input...</p>
      </div>

    </div>
  )
}