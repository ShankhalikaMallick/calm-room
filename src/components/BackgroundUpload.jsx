import { useState, useRef } from 'react';
import './BackgroundUpload.css';

const BackgroundUpload = ({ roomId, currentBackground, onBackgroundChange }) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setIsUploading(true);

      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target.result;
        localStorage.setItem(`calmRoom_${roomId}_background`, imageUrl);
        onBackgroundChange(imageUrl);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetToDefault = () => {
    localStorage.removeItem(`calmRoom_${roomId}_background`);
    onBackgroundChange(null);
  };

  return (
    <div className="background-upload">
      <button
        className="upload-trigger"
        onClick={() => fileInputRef.current?.click()}
        disabled={isUploading}
      >
        {isUploading ? '📤 Uploading...' : '🖼️ Change Background'}
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        style={{ display: 'none' }}
      />

      <div className="upload-options">
        {currentBackground && (
          <button
            className="reset-btn"
            onClick={resetToDefault}
          >
            🔄 Reset to Default
          </button>
        )}
      </div>
    </div>
  );
};

export default BackgroundUpload;