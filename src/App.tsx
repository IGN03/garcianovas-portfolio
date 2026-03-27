export default function App() {
  return (
    // w-full and min-h-screen ensures the dark background is a true canvas
    <div className="min-h-screen w-full bg-neutral-950 text-neutral-50 selection:bg-lime-400 selection:text-black">
      
      {/* No max-width here. 
          Use 'p-6' or 'p-12' if you want a little breathing room from the bezel, 
          or 'p-0' if you want a edge-to-edge HUD. 
      */}
      <main className="w-full p-6">
        <h1 className="text-xl font-mono border-b border-neutral-800 pb-2">
          GARCIA_NOVAS // ROOT_DIRECTORY
        </h1>
        
        <div className="mt-4 text-sm text-neutral-500">
          Ready for full-width components.
        </div>
      </main>

    </div>
  )
}