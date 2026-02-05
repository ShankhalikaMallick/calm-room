export const moods = {
  warm: {
    id: 'warm',
    name: 'Warm',
    greeting: 'Welcome home. You can rest now.',
    background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    overlay: 'rgba(255, 182, 193, 0.2)',
    textColor: 'text-amber-900',
    buttonColor: 'bg-amber-100 hover:bg-amber-200 text-amber-800',
    music: '/music/warm-ambient.mp3'
  },
  chill: {
    id: 'chill',
    name: 'Chill',
    greeting: 'Breathe. There is nothing to fix.',
    background: 'linear-gradient(135deg, #e3e8f0 0%, #b8c6db 100%)',
    overlay: 'rgba(147, 197, 253, 0.15)',
    textColor: 'text-slate-700',
    buttonColor: 'bg-slate-100 hover:bg-slate-200 text-slate-700',
    music: '/music/chill-ambient.mp3'
  },
  boss: {
    id: 'boss',
    name: 'Boss',
    greeting: 'You are safe. You are capable.',
    background: 'linear-gradient(135deg, #2d3748 0%, #1a202c 100%)',
    overlay: 'rgba(55, 65, 81, 0.3)',
    textColor: 'text-gray-100',
    buttonColor: 'bg-gray-700 hover:bg-gray-600 text-gray-100',
    music: '/music/boss-focus.mp3'
  }
};

export const defaultMood = 'warm';
