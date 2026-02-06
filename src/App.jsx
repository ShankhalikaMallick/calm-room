import { useState, useEffect } from 'react';
import './App.css';
import LoginPage from './components/LoginPage';
import LaunchPage from './components/LaunchPage';
import RoomView from './components/RoomView';
import { ThemeProvider } from './contexts/ThemeContext';
import { rooms } from './data/rooms';

const App = () => {
  const [user, setUser] = useState(null);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('calmRoom_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    // Load last room for this user
    if (savedUser) {
      const email = JSON.parse(savedUser).email;
      const lastRoom = localStorage.getItem(`calmRoom_currentRoom_${email}`);
      if (lastRoom) {
        setCurrentRoom(lastRoom);
      }
    }

    setIsLoading(false);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('calmRoom_user', JSON.stringify(userData));

    // Load this specific user's last session
    const lastRoom = localStorage.getItem(`calmRoom_currentRoom_${userData.email}`);
    setCurrentRoom(lastRoom || null);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentRoom(null);
    localStorage.removeItem('calmRoom_user');
  };

  const handleRoomSelect = (room) => {
    setCurrentRoom(room.id);
    if (user) {
      localStorage.setItem(`calmRoom_currentRoom_${user.email}`, room.id);
    }
  };

  const handleBackToLaunch = () => {
    setCurrentRoom(null);
    if (user) {
      localStorage.setItem(`calmRoom_currentRoom_${user.email}`, '');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="animate-pulse-slow text-white text-lg">Preparing your digital home...</div>
      </div>
    );
  }

  // Show Login Page if not authenticated
  if (!user) {
    return (
      <ThemeProvider>
        <LoginPage onLogin={handleLogin} />
      </ThemeProvider>
    );
  }

  // Show launch page if no room selected
  if (!currentRoom) {
    return (
      <ThemeProvider>
        <div className="app-wrapper">
          <header className="app-user-header">
            <span className="user-greeting">Welcome, {user.name}</span>
            <button onClick={handleLogout} className="logout-btn">Log Out</button>
          </header>
          <LaunchPage onRoomSelect={handleRoomSelect} />
        </div>
      </ThemeProvider>
    );
  }

  // Show room view
  return (
    <ThemeProvider>
      <RoomView
        room={rooms[currentRoom]}
        onBackToLaunch={handleBackToLaunch}
      />
    </ThemeProvider>
  );
};

export default App;