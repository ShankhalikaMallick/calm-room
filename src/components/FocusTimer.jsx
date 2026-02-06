import { useState, useEffect, useRef } from 'react';
import './FocusTimer.css';

const FocusTimer = ({ onClose }) => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('focus'); // focus, shortBreak, longBreak
  
  const timerRef = useRef(null);
  
  const modes = {
    focus: { label: 'Focus', minutes: 25 },
    shortBreak: { label: 'Short Break', minutes: 5 },
    longBreak: { label: 'Long Break', minutes: 15 }
  };

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      // Play a sound if possible (fallback to simple notification)
      new Audio('/sounds/bell.mp3').play().catch(() => {});
    }

    return () => clearInterval(timerRef.current);
  }, [isActive, timeLeft]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(modes[mode].minutes * 60);
  };

  const changeMode = (newMode) => {
    setMode(newMode);
    setIsActive(false);
    setTimeLeft(modes[newMode].minutes * 60);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateProgress = () => {
    const totalSeconds = modes[mode].minutes * 60;
    const progress = ((totalSeconds - timeLeft) / totalSeconds) * 100;
    return progress;
  };

  return (
    <div className="focus-timer-container">
      <div className="timer-header">
        <h2>Focus Timer</h2>
      </div>

      <div className="timer-modes">
        {Object.entries(modes).map(([key, data]) => (
          <button
            key={key}
            className={`mode-btn ${mode === key ? 'active' : ''}`}
            onClick={() => changeMode(key)}
          >
            {data.label}
          </button>
        ))}
      </div>

      <div className="timer-circle-container">
        <svg className="timer-svg" viewBox="0 0 100 100">
          <circle 
            className="timer-bg" 
            cx="50" cy="50" r="45" 
          />
          <circle 
            className="timer-progress" 
            cx="50" cy="50" r="45"
            style={{ 
              strokeDasharray: 283,
              strokeDashoffset: 283 - (283 * calculateProgress() / 100)
            }}
          />
        </svg>
        <div className="timer-text">
          {formatTime(timeLeft)}
        </div>
      </div>

      <div className="timer-controls">
        <button className="control-btn main" onClick={toggleTimer}>
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button className="control-btn" onClick={resetTimer}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default FocusTimer;
