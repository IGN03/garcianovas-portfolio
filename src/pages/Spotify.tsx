import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, CartesianGrid, RadarChart, PolarGrid, PolarAngleAxis, Radar } from "recharts"
import { Activity, Disc3, Headphones } from "lucide-react"
import { getNowPlaying, getTopArtists } from "@/lib/spotify"

const chartConfig = {
  popularity: { label: "Popularity", color: "#a3e635" },
  value: { label: "Score", color: "#a3e635" }
}

type NowPlayingData = {
  isPlaying: boolean;
  title: string;
  artist: string;
  albumImageUrl: string;
  songUrl: string;
}

export default function Spotify() {
  const [nowPlaying, setNowPlaying] = useState<NowPlayingData | null>(null)
  const [barData, setBarData] = useState<any[]>([])
  const [radarData, setRadarData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // 1. Fetch Now Playing
        const npResponse = await getNowPlaying()
        if (npResponse.status === 204 || npResponse.status > 400) {
          setNowPlaying({ isPlaying: false, title: "Offline", artist: "Spotify is currently paused.", albumImageUrl: "", songUrl: "" })
        } else {
          const song = await npResponse.json()
          if (song.item) {
            setNowPlaying({
              isPlaying: song.is_playing,
              title: song.item.name,
              artist: song.item.artists.map((_artist: any) => _artist.name).join(", "),
              albumImageUrl: song.item.album.images[0].url,
              songUrl: song.item.external_urls.spotify,
            })
          }
        }

        // 2. Fetch Top Artists & Generate Chart Data
        const topResponse = await getTopArtists()
        if (topResponse.ok) {
          const topData = await topResponse.json()
          const artists = topData.items || []

          // Bar Chart: Top 5 Artists mapped by Popularity Score
          const top5Artists = artists.slice(0, 5).map((a: any) => ({
            name: a.name.length > 10 ? a.name.substring(0, 10) + "..." : a.name,
            popularity: a.popularity
          }))
          setBarData(top5Artists)

          // Radar Chart: Aggregate Top 5 Genres from your Top 50 Artists
          const genreCounts: Record<string, number> = {}
          artists.forEach((a: any) => {
            a.genres.forEach((g: string) => {
              genreCounts[g] = (genreCounts[g] || 0) + 1
            })
          })

          const topGenres = Object.entries(genreCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([feature, value]) => ({ feature, value }))
          
          setRadarData(topGenres)
        }
      } catch (error) {
        console.error("Error fetching Spotify data", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
    const interval = setInterval(fetchDashboardData, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="mx-auto max-w-5xl p-6 md:p-12 animate-in fade-in duration-500 space-y-8">
      
      <header className="flex items-center justify-between border-b border-neutral-800 pb-4">
        <div>
          <h1 className="text-2xl font-mono tracking-tighter flex items-center gap-3">
            ~/MUSIC_FEED
          </h1>
          <p className="mt-2 text-neutral-500 text-sm">Real-time telemetry from Spotify API.</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-lime-400/10 border border-lime-400/20">
          <div className={`w-2 h-2 rounded-full ${nowPlaying?.isPlaying ? 'bg-lime-400 animate-pulse' : 'bg-neutral-600'}`} />
          <span className={`text-xs font-mono ${nowPlaying?.isPlaying ? 'text-lime-400' : 'text-neutral-500'}`}>
            {nowPlaying?.isPlaying ? 'LIVE_STREAM' : 'SYSTEM_IDLE'}
          </span>
        </div>
      </header>

      <Card className="border-neutral-800 bg-neutral-900/50 backdrop-blur overflow-hidden relative">
        <div className="absolute top-0 right-0 p-32 bg-lime-400/5 blur-[120px] rounded-full pointer-events-none" />
        <CardContent className="p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
          <div className="w-32 h-32 rounded-md bg-neutral-800 border border-neutral-700 shadow-2xl flex items-center justify-center shrink-0 overflow-hidden relative group">
            {nowPlaying?.albumImageUrl ? (
              <img src={nowPlaying.albumImageUrl} alt="Album Art" className="w-full h-full object-cover" />
            ) : (
              <Disc3 className="w-12 h-12 text-neutral-600" />
            )}
            {nowPlaying?.songUrl && (
              <a href={nowPlaying.songUrl} target="_blank" rel="noreferrer" className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                <span className="text-xs font-mono text-lime-400">OPEN APP</span>
              </a>
            )}
          </div>
          <div className="w-full space-y-4 text-center sm:text-left">
            <div>
              <p className="text-xs font-mono text-lime-400 uppercase tracking-widest mb-1 flex items-center justify-center sm:justify-start gap-2">
                <Activity className="w-3 h-3" /> 
                {loading ? "INITIALIZING..." : nowPlaying?.isPlaying ? "NOW PLAYING" : "OFFLINE"}
              </p>
              <h2 className="text-2xl font-bold text-neutral-100 tracking-tight">
                {loading ? "Loading..." : nowPlaying?.title}
              </h2>
              <p className="text-neutral-400">
                {loading ? "Establishing connection..." : nowPlaying?.artist}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-neutral-800 bg-transparent shadow-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-neutral-200 flex items-center gap-2">
              <Headphones className="w-4 h-4 text-neutral-500" /> Heavy Rotation
            </CardTitle>
            <CardDescription className="text-xs">Top 5 artists by algorithmic popularity.</CardDescription>
          </CardHeader>
          <CardContent className="h-[250px] w-full pt-4">
            {barData.length > 0 ? (
              <ChartContainer config={chartConfig} className="h-full w-full">
                <BarChart data={barData}>
                  <CartesianGrid vertical={false} stroke="#262626" strokeDasharray="4 4" />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: "#737373", fontSize: 10 }} dy={10} />
                  <ChartTooltip cursor={{ fill: "#262626" }} content={<ChartTooltipContent />} />
                  <Bar dataKey="popularity" fill="var(--color-popularity)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-xs text-neutral-600 font-mono">AWAITING_DATA...</div>
            )}
          </CardContent>
        </Card>

        <Card className="border-neutral-800 bg-transparent shadow-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-neutral-200 flex items-center gap-2">
              <Activity className="w-4 h-4 text-neutral-500" /> Sonic Profile
            </CardTitle>
            <CardDescription className="text-xs">Dominant genres extracted from listening history.</CardDescription>
          </CardHeader>
          <CardContent className="h-[250px] w-full">
             {radarData.length > 0 ? (
              <ChartContainer config={chartConfig} className="h-full w-full mx-auto">
                <RadarChart data={radarData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <PolarGrid stroke="#262626" />
                  <PolarAngleAxis dataKey="feature" tick={{ fill: "#737373", fontSize: 10 }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Radar dataKey="value" fill="var(--color-value)" fillOpacity={0.2} stroke="var(--color-value)" strokeWidth={2} />
                </RadarChart>
              </ChartContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-xs text-neutral-600 font-mono">AWAITING_DATA...</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}