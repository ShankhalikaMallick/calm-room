import { useState, useEffect } from 'react';
import { rooms } from '../data/rooms';
import './LaunchPage.css';

const LaunchPage = ({ onRoomSelect }) => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [greeting, setGreeting] = useState('Good Afternoon');
  const [hoveredRoom, setHoveredRoom] = useState(null);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  const handleRoomClick = (room) => {
    setSelectedRoom(room);
    setTimeout(() => {
      onRoomSelect(room);
    }, 1500);
  };

  return (
    <div className="launch-page">
      {/* Background Slideshow/Gradient */}
      <div className="main-background" />

      {/* Dynamic Blurred Background */}
      {Object.values(rooms).map((room) => (
        <div
          key={`bg-${room.id}`}
          className={`dynamic-background ${hoveredRoom === room.id ? 'active' : ''}`}
          style={{ backgroundImage: `url('${room.defaultBackground}')` }}
        />
      ))}



      <div className={`content-wrapper ${selectedRoom ? 'exiting' : ''}`}>
        <header className="launch-header">
          <h2 className="greeting-sub">{greeting}</h2>
          <h1 className="main-title">
            <span className="block capitalize">Enter your </span>
            <span className="block accent-text">Haven</span>
          </h1>
        </header>

        <div className="room-cards-container">
          {Object.values(rooms).map((room) => (
            <div
              key={room.id}
              className={`room-card-wrapper ${hoveredRoom === room.id ? 'hovered' : ''} ${hoveredRoom && hoveredRoom !== room.id ? 'dimmed' : ''}`}
              onMouseEnter={() => setHoveredRoom(room.id)}
              onMouseLeave={() => setHoveredRoom(null)}
              onClick={() => handleRoomClick(room)}
            >
              <div
                className="room-card-image"
                style={{ backgroundImage: `url('${room.defaultBackground}')` }}
              />
              <div className="room-card-overlay" />

              <div className="room-card-content">
                <div className="room-icon-large">{
                  room.id === 'warm' ? '🏠' :
                    room.id === 'chill' ? '🌲' : '🏙️'
                }</div>
                <h3 className="room-card-title">{room.name}</h3>
                <p className="room-card-desc">{room.description}</p>
                <div className="enter-button">Enter Space →</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedRoom && (
        <div className="transition-overlay active">
          <div className="transition-content">
            <h2 className="transition-title">{selectedRoom.name}</h2>
            <p className="transition-quote">{selectedRoom.greeting}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LaunchPage;