import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, CartesianGrid, RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from "recharts"
import { Activity, Disc3, Headphones } from "lucide-react"

// --- MOCK DATA (We will replace this with the real API later) ---

const WEEKLY_LISTENING_DATA = [
  { day: "Mon", hours: 2.4 },
  { day: "Tue", hours: 3.1 },
  { day: "Wed", hours: 4.5 },
  { day: "Thu", hours: 3.8 },
  { day: "Fri", hours: 5.2 },
  { day: "Sat", hours: 6.0 },
  { day: "Sun", hours: 4.1 },
]

const AUDIO_PROFILE_DATA = [
  { feature: "Acoustic", value: 30 },
  { feature: "Danceability", value: 85 },
  { feature: "Energy", value: 90 },
  { feature: "Instrumental", value: 20 },
  { feature: "Valence", value: 75 },
]

// Shadcn requires a config object to map data to colors/labels
const chartConfig = {
  hours: {
    label: "Hours Listened",
    color: "#a3e635", // lime-400
  },
  value: {
    label: "Score",
    color: "#a3e635", 
  }
}

export default function Spotify() {
  return (
    <div className="mx-auto max-w-5xl p-6 md:p-12 animate-in fade-in duration-500 space-y-8">
      
      {/* Header */}
      <header className="flex items-center justify-between border-b border-neutral-800 pb-4">
        <div>
          <h1 className="text-2xl font-mono tracking-tighter flex items-center gap-3">
            ~/MUSIC_FEED
          </h1>
          <p className="mt-2 text-neutral-500 text-sm">Real-time telemetry from Spotify API.</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-lime-400/10 border border-lime-400/20">
          <div className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
          <span className="text-xs font-mono text-lime-400">API_SIMULATION</span>
        </div>
      </header>

      {/* Currently Playing Hero Card */}
      <Card className="border-neutral-800 bg-neutral-900/50 backdrop-blur overflow-hidden relative">
        <div className="absolute top-0 right-0 p-32 bg-lime-400/5 blur-[120px] rounded-full pointer-events-none" />
        <CardContent className="p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
          {/* Simulated Album Art */}
          <div className="w-32 h-32 rounded-md bg-neutral-800 border border-neutral-700 shadow-2xl flex items-center justify-center shrink-0">
            <Disc3 className="w-12 h-12 text-neutral-600 animate-[spin_4s_linear_infinite]" />
          </div>
          
          <div className="w-full space-y-4 text-center sm:text-left">
            <div>
              <p className="text-xs font-mono text-lime-400 uppercase tracking-widest mb-1 flex items-center justify-center sm:justify-start gap-2">
                <Activity className="w-3 h-3" /> Now Playing
              </p>
              <h2 className="text-2xl font-bold text-neutral-100 tracking-tight">Gosh</h2>
              <p className="text-neutral-400">Jamie xx</p>
            </div>
            
            {/* Progress Bar Simulation */}
            <div className="space-y-1.5 pt-2">
              <div className="h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden">
                <div className="h-full bg-neutral-300 w-[65%]" />
              </div>
              <div className="flex justify-between text-[10px] font-mono text-neutral-500">
                <span>02:54</span>
                <span>04:51</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Visualizations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Weekly Listening Bar Chart */}
        <Card className="border-neutral-800 bg-transparent shadow-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-neutral-200 flex items-center gap-2">
              <Headphones className="w-4 h-4 text-neutral-500" />
              Weekly Telemetry
            </CardTitle>
            <CardDescription className="text-xs">Hours of playback over the last 7 days.</CardDescription>
          </CardHeader>
          <CardContent className="h-[250px] w-full pt-4">
            <ChartContainer config={chartConfig} className="h-full w-full">
              <BarChart data={WEEKLY_LISTENING_DATA}>
                <CartesianGrid vertical={false} stroke="#262626" strokeDasharray="4 4" />
                <XAxis 
                  dataKey="day" 
                  tickLine={false} 
                  axisLine={false} 
                  tick={{ fill: "#737373", fontSize: 12 }} 
                  dy={10}
                />
                <ChartTooltip cursor={{ fill: "#262626" }} content={<ChartTooltipContent />} />
                <Bar dataKey="hours" fill="var(--color-hours)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Audio Profile Radar Chart */}
        <Card className="border-neutral-800 bg-transparent shadow-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-neutral-200 flex items-center gap-2">
              <Activity className="w-4 h-4 text-neutral-500" />
              Sonic Profile
            </CardTitle>
            <CardDescription className="text-xs">Aggregated audio features of top tracks.</CardDescription>
          </CardHeader>
          <CardContent className="h-[250px] w-full">
            <ChartContainer config={chartConfig} className="h-full w-full mx-auto">
              <RadarChart data={AUDIO_PROFILE_DATA} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <PolarGrid stroke="#262626" />
                <PolarAngleAxis 
                  dataKey="feature" 
                  tick={{ fill: "#737373", fontSize: 10 }} 
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Radar
                  dataKey="value"
                  fill="var(--color-value)"
                  fillOpacity={0.2}
                  stroke="var(--color-value)"
                  strokeWidth={2}
                />
              </RadarChart>
            </ChartContainer>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}