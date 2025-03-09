
import React, { useState, useRef } from 'react';
import { Play, Pause, Square, SkipBack, SkipForward, Volume2, Volume1, VolumeX, Music, Video, RefreshCw, Shuffle } from 'lucide-react';

const MediaPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(100);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);
  const [showPlaylist, setShowPlaylist] = useState(true);
  const [isVideo, setIsVideo] = useState(false);
  const [playlist, setPlaylist] = useState([
    { id: 1, title: 'Windows 95 Startup Sound', duration: '6s', type: 'audio' },
    { id: 2, title: 'Welcome to Windows', duration: '12s', type: 'audio' },
    { id: 3, title: 'The Rolling Hills', duration: '3:45', type: 'audio' },
    { id: 4, title: 'Digital Dreams', duration: '4:20', type: 'audio' },
    { id: 5, title: 'Windows 95 Video Tour', duration: '1:30', type: 'video' },
  ]);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const togglePlay = () => {
    if (currentTrack === null && playlist.length > 0) {
      // Start playing the first track
      setCurrentTrack(playlist[0].title);
      setIsVideo(playlist[0].type === 'video');
    }
    
    setIsPlaying(!isPlaying);
    
    if (!isPlaying) {
      // Simulate playback progress
      timerRef.current = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            clearInterval(timerRef.current!);
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const stop = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const playTrack = (track: any) => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setCurrentTrack(track.title);
    setIsVideo(track.type === 'video');
    setCurrentTime(0);
    setDuration(parseDuration(track.duration));
    setIsPlaying(true);
    
    // Simulate playback progress
    timerRef.current = setInterval(() => {
      setCurrentTime(prev => {
        if (prev >= duration) {
          clearInterval(timerRef.current!);
          setIsPlaying(false);
          return 0;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const parseDuration = (durStr: string): number => {
    if (durStr.includes(':')) {
      const [min, sec] = durStr.split(':').map(n => parseInt(n));
      return min * 60 + sec;
    }
    return parseInt(durStr.replace('s', ''));
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    if (newVolume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseInt(e.target.value);
    setCurrentTime(newTime);
  };

  const skipNext = () => {
    if (!currentTrack) return;
    
    const currentIndex = playlist.findIndex(track => track.title === currentTrack);
    if (currentIndex < playlist.length - 1) {
      playTrack(playlist[currentIndex + 1]);
    }
  };

  const skipPrevious = () => {
    if (!currentTrack) return;
    
    const currentIndex = playlist.findIndex(track => track.title === currentTrack);
    if (currentIndex > 0) {
      playTrack(playlist[currentIndex - 1]);
    } else {
      // If it's the first track, just restart it
      setCurrentTime(0);
    }
  };

  return (
    <div className="p-2 h-full flex flex-col">
      <div className="win95-inset flex-1 bg-win95-darkgray overflow-hidden relative">
        {currentTrack ? (
          isVideo ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Video size={48} className="mx-auto mb-2 text-white" />
                <p className="text-white">Video: {currentTrack}</p>
                <p className="text-white text-xs mt-2">{isPlaying ? 'Playing...' : 'Paused'}</p>
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Music size={48} className="mx-auto mb-2 text-white animate-pulse" />
                <p className="text-white">{currentTrack}</p>
                <div className="mt-4 flex justify-center">
                  <div className="win95-visualizer">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div 
                        key={i} 
                        className="win95-visualizer-bar"
                        style={{ 
                          height: isPlaying ? `${Math.random() * 50 + 10}px` : '5px',
                          animationDelay: `${i * 0.1}s`
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Music size={48} className="mx-auto mb-2 text-white" />
              <p className="text-white">No media loaded</p>
              <p className="text-white text-xs mt-2">Select a track from the playlist</p>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-2">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs w-10">{formatTime(currentTime)}</span>
          <input 
            type="range" 
            min="0" 
            max={duration} 
            value={currentTime}
            onChange={handleProgressChange}
            className="flex-1" 
          />
          <span className="text-xs w-10">{formatTime(duration)}</span>
        </div>
        
        <div className="flex gap-1 mb-2">
          <button 
            className="win95-button p-1 flex-1 flex items-center justify-center"
            onClick={skipPrevious}
          >
            <SkipBack size={16} />
          </button>
          <button 
            className="win95-button p-1 flex-1 flex items-center justify-center"
            onClick={togglePlay}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>
          <button 
            className="win95-button p-1 flex-1 flex items-center justify-center"
            onClick={stop}
          >
            <Square size={16} />
          </button>
          <button 
            className="win95-button p-1 flex-1 flex items-center justify-center"
            onClick={skipNext}
          >
            <SkipForward size={16} />
          </button>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            className="win95-button p-1"
            onClick={toggleMute}
          >
            {isMuted ? <VolumeX size={16} /> : volume < 30 ? <Volume1 size={16} /> : <Volume2 size={16} />}
          </button>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="flex-1" 
          />
          <button 
            className="win95-button p-1"
            onClick={() => setShowPlaylist(!showPlaylist)}
          >
            {showPlaylist ? 'Hide List' : 'Show List'}
          </button>
        </div>
      </div>
      
      {showPlaylist && (
        <div className="mt-2">
          <div className="win95-inset p-1 bg-white">
            <div className="text-xs font-bold mb-1 p-1 bg-win95-darkgray text-white">
              Playlist
            </div>
            <div className="overflow-auto max-h-32">
              {playlist.map((track) => (
                <div 
                  key={track.id}
                  className={`p-1 text-xs flex justify-between items-center cursor-pointer hover:bg-win95-blue hover:text-white ${currentTrack === track.title ? 'bg-win95-darkgray text-white' : ''}`}
                  onClick={() => playTrack(track)}
                >
                  <div className="flex items-center">
                    {track.type === 'video' ? <Video size={12} className="mr-1" /> : <Music size={12} className="mr-1" />}
                    <span>{track.title}</span>
                  </div>
                  <span>{track.duration}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-1 mt-1">
            <button className="win95-button text-xs py-0.5 px-2 flex-1 flex items-center justify-center">
              <RefreshCw size={12} className="mr-1" />
              Repeat
            </button>
            <button className="win95-button text-xs py-0.5 px-2 flex-1 flex items-center justify-center">
              <Shuffle size={12} className="mr-1" />
              Shuffle
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaPlayer;
