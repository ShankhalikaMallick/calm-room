import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import CuteFolders from './CuteFolders';
import FolderContent from './FolderContent';
import NotepadView from './NotepadView';
import './RoomView.css';

const RoomView = ({ room, onBackToLaunch }) => {
  const [openFolder, setOpenFolder] = useState(null);
  const [customBackground, setCustomBackground] = useState(null);
  const currentBackground = customBackground || room.defaultBackground;
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="room-container">
      {/* Background with theme-based gradient */}
      <div
        className="room-background"
        style={{
          backgroundImage: `url('${customBackground || room.defaultBackground}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: isDarkMode ? '#040e1eff' : '#ddddfcff',
          filter: 'blur(20px)',
          transform: 'scale(1.1)' // Prevents white edges from blur
        }}
      >
        <div
          className="room-overlay"
          style={{ backgroundColor: isDarkMode ? 'rgba(9, 18, 36, 0.4)' : room.overlay }}
        />
      </div>

      <div className="room-content">
        {/* Header */}
        <header className="room-header">
          {/* Left side - Back button */}
          <div className="back-button-container">
            <button
              onClick={openFolder ? () => setOpenFolder(null) : onBackToLaunch}
              className="back-button"
              title="Back"
            >
              ← {openFolder ? 'Back' : 'Home'}
            </button>
          </div>

          {/* Center - Room title and greeting */}
          <div className="room-title">
            {!openFolder && <h1 className="greeting animate-fade-in">{room.greeting}</h1>}
            <p className="room-name">{room.name}</p>
          </div>

          <div className="controls-container">
            <button
              onClick={toggleTheme}
              className="theme-toggle"
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              <span className="theme-text">{isDarkMode ? '☀️' : '🌙'}</span>
            </button>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="room-main-content">
          {openFolder ? (
            <FolderContent
              key={openFolder}
              hobbyId={openFolder}
              hobbyName={openFolder}
              onBack={() => setOpenFolder(null)}
              room={room}
            />
          ) : (
            <div className="folders-container">
              <CuteFolders
                room={room}
                onFolderOpen={setOpenFolder}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomView;