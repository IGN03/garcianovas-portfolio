import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Activity, Disc3, Music, Clock, Users } from "lucide-react"
import { getNowPlaying, getTopArtists, getTopTracks, getRecentlyPlayed } from "@/lib/spotify"
import { Button } from "@/components/ui/button"

type TrackData = {
  title: string;
  artist: string;
  albumImageUrl: string;
  songUrl: string;
  isPlaying?: boolean;
}

type ArtistData = {
  name: string;
  imageUrl: string;
  url: string;
}

export default function Spotify() {
  const [nowPlaying, setNowPlaying] = useState<TrackData | null>(null)
  const [topTracks, setTopTracks] = useState<TrackData[]>([])
  const [topArtists, setTopArtists] = useState<ArtistData[]>([])
  const [recentTracks, setRecentTracks] = useState<TrackData[]>([])
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState<'short_term' | 'medium_term' | 'long_term'>('short_term')

  const fetchDashboardData = async (range: 'short_term' | 'medium_term' | 'long_term') => {
    try {
      // 1. Fetch Now Playing & Recent
      const npResponse = await getNowPlaying()
      const rpResponse = await getRecentlyPlayed(6)
      
      let npData: TrackData | null = null;
      let recentData: TrackData[] = [];

      if (rpResponse.ok) {
        const rpJson = await rpResponse.json()
        recentData = rpJson.items.map((item: any) => ({
          title: item.track.name,
          artist: item.track.artists.map((a: any) => a.name).join(", "),
          albumImageUrl: item.track.album.images[0].url,
          songUrl: item.track.external_urls.spotify
        }))
      }

      if (npResponse.status === 204 || npResponse.status > 400) {
        if (recentData.length > 0) {
          npData = { ...recentData[0], isPlaying: false }
        }
      } else {
        const song = await npResponse.json()
        if (song.item) {
          npData = {
            isPlaying: song.is_playing,
            title: song.item.name,
            artist: song.item.artists.map((_artist: any) => _artist.name).join(", "),
            albumImageUrl: song.item.album.images[0].url,
            songUrl: song.item.external_urls.spotify,
          }
        }
      }
      setNowPlaying(npData)
      // If we are currently playing, the first "recent" track is actually what was playing before this one or is the same one. 
      // Spotify "recently played" includes the current track once it's finished or sometimes while playing.
      // We'll just show the first 5 from the recent list.
      setRecentTracks(recentData.slice(0, 5))

      // 2. Fetch Top Artists
      const topArtistsResponse = await getTopArtists(range)
      if (topArtistsResponse.ok) {
        const topData = await topArtistsResponse.json()
        const artists = topData.items || []

        setTopArtists(artists.slice(0, 5).map((a: any) => ({
          name: a.name,
          imageUrl: a.images?.[0]?.url || "",
          url: a.external_urls?.spotify || ""
        })))
      }

      // 3. Fetch Top Tracks
      const topTracksResponse = await getTopTracks(range)
      if (topTracksResponse.ok) {
        const topTracksData = await topTracksResponse.json()
        setTopTracks(topTracksData.items.map((track: any) => ({
          title: track.name,
          artist: track.artists.map((a: any) => a.name).join(", "),
          albumImageUrl: track.album.images[0].url,
          songUrl: track.external_urls.spotify
        })))
      }
    } catch (error) {
      console.error("Error fetching Spotify data", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboardData(timeRange)
    const interval = setInterval(() => fetchDashboardData(timeRange), 30000)
    return () => clearInterval(interval)
  }, [timeRange])

  const timeRanges = [
    { label: "4 WEEKS", value: "short_term" },
    { label: "6 MONTHS", value: "medium_term" },
    { label: "ALL TIME", value: "long_term" },
  ] as const

  return (
    <div className="mx-auto max-w-5xl p-6 md:p-12 animate-in fade-in duration-500 space-y-8">
      
      <header className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-800 pb-4 gap-4">
        <div>
          <h1 className="text-2xl font-mono tracking-tighter flex items-center gap-3">
            ~/MUSIC_FEED
          </h1>
          <p className="mt-2 text-neutral-500 text-sm">Real-time telemetry from Spotify API.</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800">
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
                {nowPlaying?.isPlaying ? <Activity className="w-3 h-3" /> : <Clock className="w-3 h-3" />} 
                {loading ? "INITIALIZING..." : nowPlaying?.isPlaying ? "NOW PLAYING" : "LAST PLAYED"}
              </p>
              <h2 className="text-2xl font-bold text-neutral-100 tracking-tight">
                {loading ? "Loading..." : nowPlaying?.title || "Nothing played yet"}
              </h2>
              <p className="text-neutral-400">
                {loading ? "Establishing connection..." : nowPlaying?.artist || "Offline"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center sm:justify-end gap-2">
        {timeRanges.map((range) => (
          <Button 
            key={range.value}
            variant="ghost" 
            size="sm"
            onClick={() => setTimeRange(range.value)}
            className={`text-[10px] font-mono tracking-tighter ${timeRange === range.value ? 'bg-lime-400/10 text-lime-400 border border-lime-400/20' : 'text-neutral-500'}`}
          >
            {range.label}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <Card className="border-neutral-800 bg-neutral-900/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-neutral-200 flex items-center gap-2">
              <Users className="w-4 h-4 text-neutral-500" /> Heavy Rotation
            </CardTitle>
            <CardDescription className="text-xs">Top artists for the selected range.</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-4">
              {topArtists.length > 0 ? (
                topArtists.map((artist, idx) => (
                  <div key={idx} className="flex items-center gap-4 group">
                    <span className="text-xs font-mono text-neutral-600 w-4">{idx + 1}</span>
                    <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-neutral-800">
                      <img src={artist.imageUrl} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-neutral-200 truncate group-hover:text-lime-400 transition-colors">
                        <a href={artist.url} target="_blank" rel="noreferrer">{artist.name}</a>
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-xs text-neutral-600 font-mono">SCANNING_FREQUENCIES...</div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-neutral-800 bg-neutral-900/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-neutral-200 flex items-center gap-2">
              <Clock className="w-4 h-4 text-neutral-500" /> Recent History
            </CardTitle>
            <CardDescription className="text-xs">Your last 5 played tracks.</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-4">
              {recentTracks.length > 0 ? (
                recentTracks.map((track, idx) => (
                  <div key={idx} className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded overflow-hidden shrink-0 border border-neutral-800">
                      <img src={track.albumImageUrl} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-neutral-200 truncate group-hover:text-lime-400 transition-colors">
                        <a href={track.songUrl} target="_blank" rel="noreferrer">{track.title}</a>
                      </p>
                      <p className="text-xs text-neutral-500 truncate">{track.artist}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-xs text-neutral-600 font-mono">RETRIEVING_LOGS...</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-neutral-800 bg-neutral-900/30">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-neutral-200 flex items-center gap-2">
            <Music className="w-4 h-4 text-neutral-500" /> Top Tracks
          </CardTitle>
          <CardDescription className="text-xs">Your most played songs for the selected time range.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topTracks.length > 0 ? (
              topTracks.map((track, idx) => (
                <div key={idx} className="flex items-center gap-4 group">
                  <span className="text-xs font-mono text-neutral-600 w-4">{idx + 1}</span>
                  <div className="w-10 h-10 rounded overflow-hidden shrink-0 border border-neutral-800">
                    <img src={track.albumImageUrl} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-neutral-200 truncate group-hover:text-lime-400 transition-colors">
                      <a href={track.songUrl} target="_blank" rel="noreferrer">{track.title}</a>
                    </p>
                    <p className="text-xs text-neutral-500 truncate">{track.artist}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-xs text-neutral-600 font-mono">COLLECTING_TELEMETRY...</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}