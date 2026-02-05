import { useState, useEffect } from 'react';
import { moods, defaultMood } from './moods';
import './App.css';

function App() {
  const [currentMood, setCurrentMood] = useState(defaultMood);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [audio, setAudio] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const mood = moods[currentMood];

// Initialize app using localStorage
  useEffect(() => {
    const initializeApp = () => {
      // Load from localStorage
      const savedMood = localStorage.getItem('calmRoom_mood');
      const savedVolume = localStorage.getItem('calmRoom_volume');
      const savedMuted = localStorage.getItem('calmRoom_muted');

      if (savedMood) {
        setCurrentMood(savedMood);
      }
      if (savedVolume) {
        setVolume(parseFloat(savedVolume));
      }
      if (savedMuted) {
        setIsMuted(savedMuted === 'true');
      }

      setIsLoading(false);
    };

    initializeApp();
  }, []);

  // Handle music playback
  useEffect(() => {
    if (audio) {
      audio.pause();
      audio.src = '';
    }

    if (!isMuted && mood.music) {
      const newAudio = new Audio(mood.music);
      newAudio.loop = true;
      newAudio.volume = volume;
      newAudio.play().catch(e => console.log('Audio play failed:', e));
      setAudio(newAudio);
    }

    return () => {
      if (audio) {
        audio.pause();
      }
    };
  }, [currentMood, isMuted]);

  // Update volume
  useEffect(() => {
    if (audio) {
      audio.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted, audio]);

  // Save settings to localStorage
  const saveSettings = (newMood, newVolume, newMuted) => {
    localStorage.setItem('calmRoom_mood', newMood);
    localStorage.setItem('calmRoom_volume', newVolume.toString());
    localStorage.setItem('calmRoom_muted', newMuted.toString());
  };

  const handleMoodChange = (newMood) => {
    setCurrentMood(newMood);
    saveSettings(newMood, volume, isMuted);
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    saveSettings(currentMood, newVolume, isMuted);
  };

  const handleMuteToggle = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    saveSettings(currentMood, volume, newMuted);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="animate-pulse-slow text-amber-800 text-lg">Finding your calm space...</div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen relative overflow-hidden transition-all duration-3000 ease-in-out"
      style={{ background: mood.background }}
    >
      {/* Soft overlay for readability */}
      <div 
        className="absolute inset-0 transition-opacity duration-3000 ease-in-out"
        style={{ backgroundColor: mood.overlay }}
      />
      
      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-8">
        {/* Greeting */}
        <h1 className={`text-2xl md:text-3xl font-light mb-16 text-center animate-fade-in ${mood.textColor}`}>
          {mood.greeting}
        </h1>

        {/* Mood selector */}
        <div className="flex gap-4 mb-12">
          {Object.values(moods).map((moodOption) => (
            <button
              key={moodOption.id}
              onClick={() => handleMoodChange(moodOption.id)}
              className={`px-6 py-3 rounded-full transition-all duration-500 transform hover:scale-105 ${
                currentMood === moodOption.id
                  ? 'ring-2 ring-white ring-opacity-50 shadow-lg'
                  : ''
              } ${mood.buttonColor}`}
            >
              {moodOption.name}
            </button>
          ))}
        </div>

        {/* Audio controls */}
        <div className="flex items-center gap-6">
          <button
            onClick={handleMuteToggle}
            className={`p-3 rounded-full transition-all duration-300 ${mood.buttonColor}`}
          >
            {isMuted ? '🔇' : '🔊'}
          </button>
          
          <div className="flex items-center gap-3">
            <span className={`text-sm ${mood.textColor}`}>🔈</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              className="w-24 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer opacity-60 hover:opacity-80 transition-opacity"
            />
            <span className={`text-sm ${mood.textColor}`}>🔉</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
