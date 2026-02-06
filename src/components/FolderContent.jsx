import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import FocusTimer from './FocusTimer';
import NotepadView from './NotepadView';
import './FolderContent.css';

const FolderContent = ({ hobbyId, hobbyName, onBack, room }) => {
  const { isDarkMode } = useTheme();
  const finalHobbyId = hobbyId === 'add-new' ? 'notes' : hobbyId;

  // Initialize state from localStorage once on mount
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem(`calmRoom_${room.id}_${finalHobbyId}`);
    if (savedItems) {
      try {
        return JSON.parse(savedItems);
      } catch (e) {
        console.error("Failed to parse saved items", e);
      }
    }
    // Return samples if nothing saved
    const samples = {
      books: [
        { id: 1, text: 'The Midnight Library', details: 'Matt Haig', status: 'read', rating: 5, date: '2023-10-10' },
        { id: 2, text: 'Atomic Habits', details: 'James Clear', status: 'toread', rating: 0, date: '2023-11-12' }
      ],
      cars: [
        { id: 3, text: 'Porsche 911 GT3', details: 'The ultimate driving machine', specs: '500hp, 4.0L Flat-6', logo: 'Porsche', date: '2024-01-05' }
      ],
      coding: [
        { id: 4, text: 'Calm Room App', details: 'A peaceful workspace for hobbies', language: 'React/JS', github: 'https://github.com/user/calm-room', date: '2024-02-06' }
      ],
      notes: [
        { id: 100, text: 'My First Thought', details: 'This is a note I made in the notepad.', sticker: '✨', type: 'note', date: '2026-02-06' }
      ]
    };
    return samples[finalHobbyId] || [];
  });

  const [newItem, setNewItem] = useState({
    text: '', details: '', status: 'toread', rating: 0, url: '',
    specs: '', artType: '', location: '', timeline: '',
    language: '', github: '', rank: 'beginner', logo: '',
    instrumentType: '', experience: '', songs: '',
    quoteColor: '#ff9a9e', taskType: 'chore', careerType: 'job'
  });

  const [showAddForm, setShowAddForm] = useState(false);
  const [showNotepad, setShowNotepad] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Save items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(`calmRoom_${room.id}_${finalHobbyId}`, JSON.stringify(items));
  }, [items, finalHobbyId, room.id]);

  const addItem = () => {
    if (newItem.text.trim()) {
      const itemToAdd = {
        ...newItem,
        id: Date.now(),
        date: new Date().toLocaleDateString()
      };
      setItems([itemToAdd, ...items]);
      resetForm();
      setShowAddForm(false);
    }
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setNewItem(item);
    setShowAddForm(true);
  };

  const saveEdit = () => {
    setItems(items.map(item => item.id === editingId ? { ...newItem, id: editingId } : item));
    resetForm();
    setEditingId(null);
    setShowAddForm(false);
  };

  const resetForm = () => {
    setNewItem({
      text: '', details: '', status: 'toread', rating: 0, url: '',
      specs: '', artType: '', location: '', timeline: '',
      language: '', github: '', rank: 'beginner', logo: '',
      instrumentType: '', experience: '', songs: '',
      quoteColor: '#ff9a9e', taskType: 'chore', careerType: 'job'
    });
  };

  const deleteItem = (id) => {
    if (window.confirm('Delete this item?')) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  // Render specific content based on type
  if (hobbyId === 'timer') {
    return (
      <div className="folder-content glass-panel-container">
        <div className="folder-container-inner">
          <FocusTimer />
        </div>
      </div>
    );
  }

  const isBookMode = finalHobbyId === 'books';
  const isArtMode = finalHobbyId === 'art';
  const isPlaylistMode = finalHobbyId === 'playlists' || finalHobbyId === 'recipes';
  const isJournalMode = finalHobbyId === 'journaling';
  const isTravelMode = finalHobbyId === 'travel';
  const isNotesMode = finalHobbyId === 'notes';
  const isCodingMode = finalHobbyId === 'coding';
  const isGameMode = finalHobbyId === 'games';
  const isCarMode = finalHobbyId === 'cars';
  const isInstrumentMode = finalHobbyId === 'instruments';
  const isQuoteMode = finalHobbyId === 'quotes';
  const isLifestyleMode = finalHobbyId === 'lifestyle';
  const isCareerMode = finalHobbyId === 'career';

  if (showNotepad) {
    return <NotepadView onBack={() => {
      setShowNotepad(false);
      const savedItems = localStorage.getItem(`calmRoom_${room.id}_notes`);
      if (savedItems) setItems(JSON.parse(savedItems));
    }} room={room} />;
  }

  return (
    <div className={`folder-content ${isDarkMode ? 'dark-mode' : 'light-mode'} ${isJournalMode ? 'journal-page' : ''}`}>
      <div className="folder-container-inner">
        {/* Header */}
        <div className="folder-header">
          <div className="folder-title-group">
            <h2 className={`folder-title ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {isNotesMode ? 'My Notes' : hobbyName}
            </h2>
            <p className="folder-subtitle">{items.length} collections</p>
          </div>
          <div className="folder-header-actions">
            <button
              onClick={() => isNotesMode ? setShowNotepad(true) : setShowAddForm(!showAddForm)}
              className="add-button-round"
            >
              {showAddForm ? '×' : '+'}
            </button>
          </div>
        </div>

        {/* Add/Edit Form */}
        {showAddForm && (
          <div className="add-form-container glass-panel sticky-form animate-fade-in">
            <h3 className="form-heading">{editingId ? 'Edit Entry' : 'Add New Entry'}</h3>
            <input
              type="text"
              placeholder={isBookMode ? "Book Title" : isJournalMode ? "Entry Title" : isTravelMode ? "Destination" : "Title / Name"}
              value={newItem.text}
              onChange={(e) => setNewItem({ ...newItem, text: e.target.value })}
              className="glass-input title-input"
              autoFocus
            />

            <div className="form-fields-grid">
              {isBookMode && (
                <>
                  <input
                    type="text"
                    placeholder="Author"
                    value={newItem.details}
                    onChange={(e) => setNewItem({ ...newItem, details: e.target.value })}
                    className="glass-input"
                  />
                  <div className="form-row-nested">
                    <select
                      value={newItem.status}
                      onChange={(e) => setNewItem({ ...newItem, status: e.target.value })}
                      className="glass-select"
                    >
                      <option value="toread">To Read</option>
                      <option value="reading">Reading</option>
                      <option value="read">Read</option>
                    </select>
                    {newItem.status === 'read' && (
                      <div className="rating-input">
                        {[1, 2, 3, 4, 5].map(star => (
                          <span
                            key={star}
                            onClick={() => setNewItem({ ...newItem, rating: star })}
                            className={`star-choice ${newItem.rating >= star ? 'filled' : ''}`}
                          >★</span>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}

              {isArtMode && (
                <>
                  <input
                    type="text"
                    placeholder="Medium (e.g. Acrylic, Charcoal)"
                    value={newItem.details}
                    onChange={(e) => setNewItem({ ...newItem, details: e.target.value })}
                    className="glass-input"
                  />
                  <input
                    type="text"
                    placeholder="Canvas Size / Specs"
                    value={newItem.specs}
                    onChange={(e) => setNewItem({ ...newItem, specs: e.target.value })}
                    className="glass-input"
                  />
                  <input
                    type="text"
                    placeholder="Type (e.g. Painting, Sketch)"
                    value={newItem.artType}
                    onChange={(e) => setNewItem({ ...newItem, artType: e.target.value })}
                    className="glass-input"
                  />
                </>
              )}

              {isCodingMode && (
                <>
                  <input
                    type="text"
                    placeholder="Programming Language"
                    value={newItem.language}
                    onChange={(e) => setNewItem({ ...newItem, language: e.target.value })}
                    className="glass-input"
                  />
                  <input
                    type="url"
                    placeholder="GitHub Repo Link"
                    value={newItem.github}
                    onChange={(e) => setNewItem({ ...newItem, github: e.target.value })}
                    className="glass-input"
                  />
                </>
              )}

              {isGameMode && (
                <select
                  value={newItem.rank}
                  onChange={(e) => setNewItem({ ...newItem, rank: e.target.value })}
                  className="glass-select"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="pro">Pro Player</option>
                </select>
              )}

              {isCarMode && (
                <>
                  <input
                    type="text"
                    placeholder="Car Brand / Logo Name"
                    value={newItem.logo}
                    onChange={(e) => setNewItem({ ...newItem, logo: e.target.value })}
                    className="glass-input"
                  />
                  <input
                    type="text"
                    placeholder="Specs (Engine, HP, etc)"
                    value={newItem.specs}
                    onChange={(e) => setNewItem({ ...newItem, specs: e.target.value })}
                    className="glass-input"
                  />
                </>
              )}

              {isInstrumentMode && (
                <>
                  <input
                    type="text"
                    placeholder="Instrument Type"
                    value={newItem.instrumentType}
                    onChange={(e) => setNewItem({ ...newItem, instrumentType: e.target.value })}
                    className="glass-input"
                  />
                  <input
                    type="text"
                    placeholder="Songs you tried"
                    value={newItem.songs}
                    onChange={(e) => setNewItem({ ...newItem, songs: e.target.value })}
                    className="glass-input"
                  />
                </>
              )}

              {isQuoteMode && (
                <div className="color-picker-container">
                  <label>Background Hue:</label>
                  <div className="pastel-picker">
                    {['#ff9a9e', '#fad0c4', '#a1c4fd', '#c2e9fb', '#d4fc79', '#96e6a1', '#fbc2eb'].map(color => (
                      <div
                        key={color}
                        className={`color-swatch ${newItem.quoteColor === color ? 'active' : ''}`}
                        style={{ backgroundColor: color }}
                        onClick={() => setNewItem({ ...newItem, quoteColor: color })}
                      />
                    ))}
                  </div>
                </div>
              )}

              {isLifestyleMode && (
                <select
                  value={newItem.taskType}
                  onChange={(e) => setNewItem({ ...newItem, taskType: e.target.value })}
                  className="glass-select"
                >
                  <option value="chore">Daily Chore</option>
                  <option value="routine">Routine</option>
                  <option value="tracker">Tracker</option>
                </select>
              )}

              {isCareerMode && (
                <select
                  value={newItem.careerType}
                  onChange={(e) => setNewItem({ ...newItem, careerType: e.target.value })}
                  className="glass-select"
                >
                  <option value="job">New Job</option>
                  <option value="internship">Internship</option>
                  <option value="milestone">Milestone</option>
                </select>
              )}

              {isPlaylistMode && (
                <input
                  type="url"
                  placeholder="URL (Youtube / Spotify)"
                  value={newItem.url}
                  onChange={(e) => setNewItem({ ...newItem, url: e.target.value })}
                  className="glass-input"
                />
              )}

              {isTravelMode && (
                <>
                  <input
                    type="text"
                    placeholder="Location / Route"
                    value={newItem.location}
                    onChange={(e) => setNewItem({ ...newItem, location: e.target.value })}
                    className="glass-input"
                  />
                  <input
                    type="text"
                    placeholder="Timeline (e.g. May 2024)"
                    value={newItem.timeline}
                    onChange={(e) => setNewItem({ ...newItem, timeline: e.target.value })}
                    className="glass-input"
                  />
                </>
              )}
            </div>

            <textarea
              placeholder={isJournalMode ? "Write your thoughts..." : isInstrumentMode ? "How was the experience?" : "Notes & details..."}
              value={newItem.details}
              onChange={(e) => setNewItem({ ...newItem, details: e.target.value })}
              className={`glass-input textarea ${isJournalMode ? 'journal-textarea' : ''}`}
            />

            <div className="form-actions">
              <button
                onClick={editingId ? saveEdit : addItem}
                className="save-button-lg"
              >
                {editingId ? 'Update Entry' : 'Add to Collection'}
              </button>
              {editingId && (
                <button onClick={() => { setEditingId(null); resetForm(); setShowAddForm(false); }} className="cancel-btn">
                  Cancel
                </button>
              )}
            </div>
          </div>
        )}

        {/* List Content */}
        <div className={`items-grid ${isJournalMode ? 'journal-grid' : ''} ${isTravelMode ? 'travel-timeline' : ''}`}>
          {items.map((item, index) => (
            <div
              key={item.id}
              className={`item-card content-card ${isDarkMode ? 'card-dark' : 'card-light'} ${isJournalMode ? 'journal-card' : ''} ${item.type === 'note' ? 'note-style-card' : ''} ${isQuoteMode ? 'quote-card' : ''}`}
              style={{
                animationDelay: `${index * 0.05}s`,
                backgroundColor: isQuoteMode ? item.quoteColor : undefined,
                color: isQuoteMode ? '#1a1a1a' : undefined
              }}
            >
              {isTravelMode && <div className="timeline-dot" />}
              {item.sticker && <div className="item-sticker-overlay">{item.sticker}</div>}

              <div className="item-main">
                <div className="item-header">
                  <h3 className="item-title">{item.text}</h3>
                  <div className="item-actions">
                    <button onClick={() => startEdit(item)} className="edit-btn-tiny">✎</button>
                    <button onClick={() => deleteItem(item.id)} className="delete-btn-tiny">×</button>
                  </div>
                </div>

                <div className="item-content-body">
                  {isTravelMode && (
                    <>
                      <div className="travel-meta">
                        <span className="info-tag">📍 {item.location}</span>
                        <span className="info-tag">📅 {item.timeline}</span>
                      </div>
                      <div className="mock-map">
                        <div className="map-line"></div>
                        <div className="map-point start"></div>
                        <div className="map-point end"></div>
                      </div>
                    </>
                  )}

                  {isArtMode && (
                    <div className="art-meta">
                      {item.artType && <span className="art-tag">{item.artType}</span>}
                      {item.specs && <span className="art-tag">{item.specs}</span>}
                    </div>
                  )}

                  {isCodingMode && (
                    <div className="tech-meta">
                      <span className="info-tag">💻 {item.language || 'Code'}</span>
                      {item.github && <a href={item.github} target="_blank" rel="noreferrer" className="link-tag">GitHub ↗</a>}
                    </div>
                  )}

                  {isGameMode && <span className="rank-tag">{item.rank} player</span>}

                  {isCarMode && (
                    <div className="car-meta">
                      <span className="brand-label">{item.logo}</span>
                      <p className="specs-text">{item.specs}</p>
                    </div>
                  )}

                  {isInstrumentMode && (
                    <div className="instr-meta">
                      <span className="type-tag">{item.instrumentType}</span>
                      {item.songs && <p className="songs-list">Played: {item.songs}</p>}
                    </div>
                  )}

                  {isLifestyleMode && <span className="chore-tag">{item.taskType}</span>}
                  {isCareerMode && <span className="career-tag">{item.careerType}</span>}

                  <p className="item-details">{item.details}</p>
                </div>

                <div className="item-footer">
                  <div className="footer-left">
                    {item.date && <span className="item-date">{item.date}</span>}
                    {isPlaylistMode && item.url && (
                      <a href={item.url} target="_blank" rel="noreferrer" className="mini-link">Open Link</a>
                    )}
                  </div>

                  {(isBookMode || item.rating > 0) && (
                    <div className="rating-display">
                      {'★'.repeat(item.rating)}{'☆'.repeat(5 - item.rating)}
                    </div>
                  )}

                  {isBookMode && (
                    <div className="item-meta">
                      <span className={`status-tag ${item.status}`}>
                        {item.status === 'toread' ? 'To Read' : item.status === 'reading' ? 'Reading' : 'Read'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {items.length === 0 && !showAddForm && (
            <div className="empty-state">
              <p>Empty collection. Let's add something!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FolderContent;