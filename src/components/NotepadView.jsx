import { useState, useEffect } from 'react';
import './NotepadView.css';

const NotepadView = ({ onBack, room }) => {
    const [noteTitle, setNoteTitle] = useState('');
    const [noteContent, setNoteContent] = useState('');
    const [selectedSticker, setSelectedSticker] = useState(null);
    const [showStickerPicker, setShowStickerPicker] = useState(false);

    const stickers = ['⭐', '💖', '✨', '🍀', '🦋', '🌈', '🎨', '📚', '🍕', '🐱', '🌙', '🌸', '🦖'];

    const handleSave = () => {
        if (!noteTitle.trim() && !noteContent.trim()) return;

        const newNote = {
            id: Date.now(),
            text: noteTitle || 'New Idea',
            details: noteContent,
            sticker: selectedSticker,
            date: new Date().toLocaleDateString(),
            type: 'note'
        };

        // Save to the "notes" folder/hobby for this room
        const savedNotes = localStorage.getItem(`calmRoom_${room.id}_notes`);
        const notes = savedNotes ? JSON.parse(savedNotes) : [];
        notes.unshift(newNote);
        localStorage.setItem(`calmRoom_${room.id}_notes`, JSON.stringify(notes));

        alert('Saved to My Ideas!');
        onBack();
    };

    return (
        <div className="notepad-view-container">
            <div className="notepad-paper">
                {/* Spiral Binding */}
                <div className="notepad-spiral-left"></div>

                <div className="notepad-paper-content">
                    <div className="notepad-header">
                        <div className="title-with-sticker">
                            {selectedSticker && <span className="selected-sticker-display">{selectedSticker}</span>}
                            <input
                                type="text"
                                className="notepad-title-input"
                                placeholder="Note Title..."
                                value={noteTitle}
                                onChange={(e) => setNoteTitle(e.target.value)}
                            />
                        </div>
                        <button className="close-btn" onClick={onBack}>✖</button>
                    </div>

                    <div className="notepad-body">
                        <textarea
                            className="notepad-textarea"
                            placeholder="Write your thoughts here..."
                            value={noteContent}
                            onChange={(e) => setNoteContent(e.target.value)}
                        ></textarea>

                        <div className="notepad-actions">
                            <div className="sticker-section">
                                <button
                                    className="sticker-btn"
                                    onClick={() => setShowStickerPicker(!showStickerPicker)}
                                >
                                    {selectedSticker ? `Change Sticker ${selectedSticker}` : '⭐ Add Sticker'}
                                </button>

                                {showStickerPicker && (
                                    <div className="sticker-picker">
                                        {stickers.map(s => (
                                            <button
                                                key={s}
                                                className="sticker-option"
                                                onClick={() => {
                                                    setSelectedSticker(s);
                                                    setShowStickerPicker(false);
                                                }}
                                            >
                                                {s}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <button className="save-note-btn" onClick={handleSave}>
                                Save Note
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotepadView;
