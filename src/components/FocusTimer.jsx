import { useState, useEffect, useRef } from 'react';
import './FocusTimer.css';

const FocusTimer = ({ onClose }) => {
  const [durations, setDurations] = useState({
    focus: 25,
    shortBreak: 5,
    longBreak: 30
  });
  const [timeLeft, setTimeLeft] = useState(durations.focus * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('focus'); // focus, shortBreak, longBreak
  const [isEditing, setIsEditing] = useState(false);

  const timerRef = useRef(null);

  const modes = {
    focus: { label: 'Focus', key: 'focus' },
    shortBreak: { label: 'Short Break', key: 'shortBreak' },
    longBreak: { label: 'Long Break', key: 'longBreak' }
  };

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft <= 0 && isActive) {
      setIsActive(false);
      new Audio('/sounds/bell.mp3').play().catch(() => { });
      alert(`${modes[mode].label} finished!`);
    }

    return () => clearInterval(timerRef.current);
  }, [isActive, timeLeft, mode]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(durations[mode] * 60);
  };

  const changeMode = (newMode) => {
    setMode(newMode);
    setIsActive(false);
    setTimeLeft(durations[newMode] * 60);
  };

  const updateDuration = (val) => {
    const mins = Math.max(1, parseInt(val) || 1);
    const newDurations = { ...durations, [mode]: mins };
    setDurations(newDurations);
    setTimeLeft(mins * 60);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateProgress = () => {
    const totalSeconds = durations[mode] * 60;
    const progress = ((totalSeconds - timeLeft) / totalSeconds) * 100;
    return progress;
  };

  return (
    <div className="focus-timer-container animate-fade-in">
      <div className="timer-header">
        <h2 className="room-name">{modes[mode].label}</h2>
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
        <div className="timer-text-container" onClick={() => !isActive && setIsEditing(true)}>
          {isEditing ? (
            <input
              type="number"
              className="timer-edit-input"
              value={durations[mode]}
              onChange={(e) => updateDuration(e.target.value)}
              onBlur={() => setIsEditing(false)}
              onKeyDown={(e) => e.key === 'Enter' && setIsEditing(false)}
              autoFocus
            />
          ) : (
            <div className="timer-text">
              {formatTime(timeLeft)}
              <span className="edit-hint">✎ click to set</span>
            </div>
          )}
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
