import { useState } from 'react';
import './NotepadView.css';

const NotepadView = ({ onBack }) => {
    const [noteTitle, setNoteTitle] = useState('');
    const [noteContent, setNoteContent] = useState('');

    return (
        <div className="notepad-view-container">
            <div className="notepad-overlay" onClick={onBack}></div>

            <div className="notepad-paper">
                {/* Spiral Binding */}
                <div className="notepad-spiral-left"></div>

                <div className="notepad-paper-content">
                    <div className="notepad-header">
                        <input
                            type="text"
                            className="notepad-title-input"
                            placeholder="My New Hobby..."
                            value={noteTitle}
                            onChange={(e) => setNoteTitle(e.target.value)}
                        />
                        <button className="close-btn" onClick={onBack}>✖</button>
                    </div>

                    <div className="notepad-body">
                        <textarea
                            className="notepad-textarea"
                            placeholder="Start writing about your new hobby here..."
                            value={noteContent}
                            onChange={(e) => setNoteContent(e.target.value)}
                        ></textarea>

                        <div className="notepad-actions">
                            <button className="sticker-btn">⭐ Add Sticker</button>
                            <button className="save-note-btn" onClick={() => {
                                alert('Saved to your collection!');
                                onBack();
                            }}>Save Note</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotepadView;
