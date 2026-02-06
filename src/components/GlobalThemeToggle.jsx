import { useTheme } from '../contexts/ThemeContext';
import './GlobalThemeToggle.css';

const GlobalThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button 
      onClick={toggleTheme}
      className="global-theme-toggle"
      title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      <span className="toggle-icon">
        {isDarkMode ? '☀️' : '🌙'}
      </span>
      <span className="toggle-label">
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </span>
    </button>
  );
};

export default GlobalThemeToggle;