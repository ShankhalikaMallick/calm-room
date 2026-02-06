import { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import FocusTimer from './FocusTimer';
import './FolderContent.css';

const FolderContent = ({ hobbyId, hobbyName, onBack, room }) => {
  const { isDarkMode } = useTheme();
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ text: '', details: '', status: 'toread', rating: 0 });
  const [showAddForm, setShowAddForm] = useState(false);

  // Load items from localStorage on mount
  useEffect(() => {
    const savedItems = localStorage.getItem(`calmRoom_${room.id}_${hobbyId}`);
    if (savedItems) {
      try {
        setItems(JSON.parse(savedItems));
      } catch (e) {
        console.error("Failed to parse saved items", e);
        setItems([]);
      }
    } else {
      // Load sample items if no saved data
      const sample = getSampleItems(hobbyId);
      if (sample) setItems(sample);
    }
  }, [hobbyId, room.id]);

  // Save items to localStorage whenever they change
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem(`calmRoom_${room.id}_${hobbyId}`, JSON.stringify(items));
    }
  }, [items, hobbyId, room.id]);

  const getSampleItems = (id) => {
    const samples = {
      books: [
        { id: 1, text: 'The Midnight Library', details: 'Matt Haig', status: 'read', rating: 5 },
        { id: 2, text: 'Atomic Habits', details: 'James Clear', status: 'toread', rating: 0 }
      ],
      art: [
        { id: 3, text: 'Sunset over Lake', details: 'Acrylic on Canvas, 12x16', date: '2023-11-15' },
        { id: 4, text: 'Morning Sketch', details: 'Charcoal, A4', date: '2023-12-01' }
      ],
      quotes: [
        { id: 5, text: 'The only way to do great work is to love what you do.', details: 'Steve Jobs' }
      ]
    };
    return samples[id] || [];
  };

  const addItem = () => {
    if (newItem.text.trim()) {
      const itemToAdd = {
        ...newItem,
        id: Date.now(),
        date: new Date().toLocaleDateString()
      };
      setItems([itemToAdd, ...items]);
      setNewItem({ text: '', details: '', status: 'toread', rating: 0 });
      setShowAddForm(false);
    }
  };

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItemStatus = (id, status) => {
    setItems(items.map(item => item.id === id ? { ...item, status } : item));
  };

  // Render specific content based on type
  if (hobbyId === 'timer') {
    return (
      <div className="folder-content glass-panel-container">
        <div className="folder-container-inner">
          <div className="folder-header">
            <button onClick={onBack} className="back-button">← Back</button>
            <h2 className="folder-title">⏱️ {hobbyName}</h2>
          </div>
          <FocusTimer />
        </div>
      </div>
    );
  }

  const isBookMode = hobbyId === 'books';
  const isArtMode = hobbyId === 'art';

  return (
    <div className={`folder-content ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="folder-container-inner">
        {/* Header */}
        <div className="folder-header">
          <button onClick={onBack} className="back-button">← Back</button>
          <h2 className={`folder-title ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            {hobbyName}
          </h2>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="add-button"
          >
            {showAddForm ? 'Cancel' : '+ Add New'}
          </button>
        </div>

        {/* Add Form */}
        {showAddForm && (
          <div className="add-form-container glass-panel">
            <input
              type="text"
              placeholder={isBookMode ? "Book Title" : "Title / Name"}
              value={newItem.text}
              onChange={(e) => setNewItem({ ...newItem, text: e.target.value })}
              className="glass-input title-input"
              autoFocus
            />

            {isBookMode && (
              <div className="form-row">
                <input
                  type="text"
                  placeholder="Author"
                  value={newItem.details}
                  onChange={(e) => setNewItem({ ...newItem, details: e.target.value })}
                  className="glass-input"
                />
                <select
                  value={newItem.status}
                  onChange={(e) => setNewItem({ ...newItem, status: e.target.value })}
                  className="glass-select"
                >
                  <option value="toread">To Read</option>
                  <option value="reading">Reading</option>
                  <option value="read">Read</option>
                </select>
              </div>
            )}

            {isArtMode && (
              <div className="form-row">
                <input
                  type="text"
                  placeholder="Specs (e.g. Acrylic, 5x7)"
                  value={newItem.details}
                  onChange={(e) => setNewItem({ ...newItem, details: e.target.value })}
                  className="glass-input"
                />
              </div>
            )}

            {!isBookMode && !isArtMode && (
              <textarea
                placeholder="Details, notes, or thoughts..."
                value={newItem.details}
                onChange={(e) => setNewItem({ ...newItem, details: e.target.value })}
                className="glass-input textarea"
              />
            )}

            <button onClick={addItem} className="save-button-lg">
              Save Item
            </button>
          </div>
        )}

        {/* List Content */}
        <div className="items-grid">
          {items.map((item) => (
            <div key={item.id} className="item-card glass-panel">
              <div className="item-main">
                <h3 className="item-title">{item.text}</h3>
                <p className="item-details">{item.details}</p>
                {item.date && <span className="item-date">{item.date}</span>}
              </div>

              {isBookMode && (
                <div className="item-meta">
                  <span className={`status-tag ${item.status}`}>
                    {item.status === 'toread' ? 'To Read' : item.status === 'reading' ? 'Reading' : 'Read'}
                  </span>
                  {item.status === 'read' && (
                    <div className="rating">
                      {'★'.repeat(item.rating || 5)}
                    </div>
                  )}
                </div>
              )}

              <button onClick={() => deleteItem(item.id)} className="delete-btn-icon">
                ×
              </button>
            </div>
          ))}

          {items.length === 0 && !showAddForm && (
            <div className="empty-state">
              <p>No items yet. Add something to get started!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FolderContent;