import { useState } from 'react';
import './HobbyShelf.css';

const HobbyShelf = ({ room, onFolderOpen }) => {
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
    lifestyle: 'Lifestyle',
    career: 'Career',
    projects: 'Projects',
    focus: 'Focus'
  };

  return (
    <div className="hobby-shelf">
      {/* Shelf structure */}
      <div className="shelf-frame">
        {/* Top shelf */}
        <div className="shelf-level top-shelf">
          {room.hobbies.slice(0, Math.ceil(room.hobbies.length / 2)).map((hobbyId, index) => (
            <div
              key={hobbyId}
              className={`folder-container ${hoveredFolder === hobbyId ? 'hovered' : ''}`}
              style={{ animationDelay: `${index * 2}s` }}
              onMouseEnter={() => setHoveredFolder(hobbyId)}
              onMouseLeave={() => setHoveredFolder(hobbyId)}
              onClick={() => onFolderOpen(hobbyId)}
            >
              <div className="folder">
                <div className="folder-spine">
                  <div className="folder-icon">{hobbyIcons[hobbyId]}</div>
                  <div className="folder-title">{hobbyNames[hobbyId]}</div>
                </div>
                <div className="folder-edge" />
              </div>
              <div className="folder-shadow" />
            </div>
          ))}
        </div>

        {/* Middle shelf */}
        <div className="shelf-divider" />

        {/* Bottom shelf */}
        <div className="shelf-level bottom-shelf">
          {room.hobbies.slice(Math.ceil(room.hobbies.length / 2)).map((hobbyId, index) => (
            <div
              key={hobbyId}
              className={`folder-container ${hoveredFolder === hobbyId ? 'hovered' : ''}`}
              style={{ animationDelay: `${index * 2}s` }}
              onMouseEnter={() => setHoveredFolder(hobbyId)}
              onMouseLeave={() => setHoveredFolder(null)}
              onClick={() => onFolderOpen(hobbyId)}
            >
              <div className="folder">
                <div className="folder-spine">
                  <div className="folder-icon">{hobbyIcons[hobbyId]}</div>
                  <div className="folder-title">{hobbyNames[hobbyId]}</div>
                </div>
                <div className="folder-edge" />
              </div>
              <div className="folder-shadow" />
            </div>
          ))}
        </div>
      </div>

      {/* Shelf lighting effect */}
      <div className="shelf-lighting">
        <div className="light-beam beam-1" />
        <div className="light-beam beam-2" />
      </div>
    </div>
  );
};

export default HobbyShelf;