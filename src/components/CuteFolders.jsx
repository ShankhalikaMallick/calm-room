import { useState } from 'react';
import './CuteFolders.css';

const CuteFolders = ({ room, onFolderOpen }) => {
  const [hoveredFolder, setHoveredFolder] = useState(null);

  const hobbyIcons = {
    books: '📚',
    playlists: '🎵',
    art: '🎨',
    recipes: '🍳',
    gardening: '🌱',
    journaling: '📖',
    travel: '✈️',
    coding: '💻',
    games: '🎮',
    instruments: '🎸',
    timer: '⏰',
    quotes: '💭',
    cars: '🏎️',
    luxury: '💎',
    lifestyle: '🏆',
    career: '📈',
    projects: '📋',
    focus: '🎯'
  };

  const hobbyNames = {
    books: 'Books',
    playlists: 'Playlists',
    art: 'Art',
    recipes: 'Recipes',
    gardening: 'Gardening',
    journaling: 'Journaling',
    travel: 'Travel',
    coding: 'Coding',
    games: 'Games',
    instruments: 'Instruments',
    timer: 'Focus Timer',
    quotes: 'Quotes',
    cars: 'Dream Cars',
    luxury: 'Luxury',
    lifestyle: 'Lifestyle',
    career: 'Career',
    projects: 'Projects',
    focus: 'Focus'
  };

  return (
    <div className="cute-folders-container">
      {/* Floating decorative elements */}
      <div className="floating-elements">
        <div className="float-element star-1">⭐</div>
        <div className="float-element heart-1">💕</div>
        <div className="float-element star-2">✨</div>
        <div className="float-element heart-2">💕</div>
        <div className="float-element star-3">⭐</div>
        <div className="float-element star-5">✨</div>
        <div className="float-element heart-3">💕</div>
        <div className="float-element star-4">⭐</div>
        <div className="float-element heart-4">💕</div>
        <div className="float-element star-6">✨</div>
        <div className="float-element heart-5">💕</div>
        <div className="float-element star-7">✨</div>
        <div className="float-element heart-6">💕</div>
        <div className="float-element star-8">✨</div>
        <div className="float-element heart-7">💕</div>
      </div>

      {/* Folder grid */}
      <div className="cute-folder-grid">
        {room.hobbies.map((hobbyId, index) => (
          <button
            key={hobbyId}
            data-room={room.id}
            className={`cute-folder ${hoveredFolder === hobbyId ? 'hovered' : ''}`}
            style={{ animationDelay: `${index * 0.1}s` }}
            onMouseEnter={() => setHoveredFolder(hobbyId)}
            onMouseLeave={() => setHoveredFolder(hobbyId)}
            onClick={() => onFolderOpen(hobbyId)}
          >
            <div className="folder-bubble">
              <div className="folder-icon-bounce">
                {hobbyIcons[hobbyId] || '📁'}
              </div>
              <div className="folder-sparkle">✨</div>
            </div>

            <div className="folder-label">
              <span className="folder-name">{hobbyNames[hobbyId] || hobbyId}</span>
              <div className="folder-underline" />
            </div>

            {/* Hover effects */}
            <div className="folder-glow">
              <div className="glow-particle particle-1" />
              <div className="glow-particle particle-2" />
              <div className="glow-particle particle-3" />
            </div>
          </button>
        ))}

        {/* Add New Hobby Slot */}
        <button
          className={`cute-folder add-new-folder ${hoveredFolder === 'add-new' ? 'hovered' : ''}`}
          style={{ animationDelay: `${room.hobbies.length * 0.1}s` }}
          onMouseEnter={() => setHoveredFolder('add-new')}
          onMouseLeave={() => setHoveredFolder(null)}
          onClick={() => onFolderOpen('add-new')}
        >
          <div className="folder-bubble add-bubble">
            <div className="folder-icon-bounce">
              ➕
            </div>
          </div>
          <div className="folder-label">
            <span className="folder-name">Add New</span>
            <div className="folder-underline" />
          </div>
        </button>
      </div>

      {/* Cute floor decoration */}
      <div className="floor-decoration">
        <div className="floor-pattern" />
        <div className="grass-blade grass-1" />
        <div className="grass-blade grass-2" />
        <div className="grass-blade grass-3" />
      </div>
    </div>
  );
};

export default CuteFolders;