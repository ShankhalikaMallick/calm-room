import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import CuteFolders from './CuteFolders';
import FolderContent from './FolderContent';
import NotepadView from './NotepadView';
import './RoomView.css';

const RoomView = ({ room, onBackToLaunch }) => {
  const [openFolder, setOpenFolder] = useState(null);
  const [customBackground, setCustomBackground] = useState(null);
  const { isDarkMode, toggleTheme } = useTheme();


  const currentBackground = customBackground || room.defaultBackground;

  // Check if "Add New" is selected
  if (openFolder === 'add-new') {
    return <NotepadView onBack={() => setOpenFolder(null)} />;
  }

  // If a folder is open, show folder content
  if (openFolder) {
    return (
      <FolderContent
        hobbyId={openFolder}
        hobbyName={openFolder}
        onBack={() => setOpenFolder(null)}
        room={room}
      />
    );
  }

  return (
    <div className="room-container">
      {/* Background with theme-based gradient */}
      <div
        className="room-background"
        style={{
          backgroundImage: `url('${customBackground || room.defaultBackground}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: isDarkMode ? '#3d5172ff' : '#0a0a13ff',
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
              onClick={onBackToLaunch}
              className="back-button"
              title="Back to Home"
            >
              ← Home
            </button>
          </div>

          {/* Center - Room title and greeting */}
          <div className="room-title">
            <h1 className="greeting">{room.greeting}</h1>
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

        {/* Cute hobby folders */}
        <div className="folders-container">
          <CuteFolders
            room={room}
            onFolderOpen={setOpenFolder}
          />
        </div>
      </div>
    </div>
  );
};

export default RoomView;