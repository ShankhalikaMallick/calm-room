export const rooms = {
  warm: {
    id: 'warm',
    name: 'Warm Room',
    greeting: 'Welcome home. You can rest now.',
    description: 'Cozy, safe, comfort',
    backgroundImage: '/warm mood.jpeg',
    overlay: 'rgba(255, 182, 193, 0.15)',
    textColor: 'text-amber-900',
    buttonColor: 'bg-amber-100 hover:bg-amber-200 text-amber-800',
    brownNoise: '/sounds/warm-brown.mp3',
    hobbies: ['books', 'playlists', 'art', 'recipes', 'gardening', 'journaling', 'travel', 'timer'],
    launchGradient: 'from-orange-400 via-pink-400 to-red-400',
    launchColor: 'text-orange-900'
  },
  chill: {
    id: 'chill',
    name: 'Chill Room',
    greeting: 'Breathe. There is nothing to fix.',
    description: 'Slow focus, flow state',
    backgroundImage: '/chill mood.jpeg',
    overlay: 'rgba(147, 197, 253, 0.15)',
    textColor: 'text-slate-700',
    buttonColor: 'bg-slate-100 hover:bg-slate-200 text-slate-700',
    brownNoise: '/sounds/chill-brown.mp3',
    hobbies: ['coding', 'games', 'books', 'instruments', 'journaling', 'timer'],
    launchGradient: 'from-blue-400 via-indigo-400 to-purple-400',
    launchColor: 'text-blue-900'
  },
  boss: {
    id: 'boss',
    name: 'Boss Room',
    greeting: 'You are safe. You are capable.',
    description: 'Ambition, luxury, discipline',
    backgroundImage: '/boss mood.jpeg',
    overlay: 'rgba(55, 65, 81, 0.3)',
    textColor: 'text-gray-100',
    buttonColor: 'bg-gray-700 hover:bg-gray-600 text-gray-100',
    brownNoise: '/sounds/boss-brown.mp3',
    hobbies: ['quotes', 'cars', 'luxury', 'career', 'projects', 'timer'],
    launchGradient: 'from-gray-800 via-gray-900 to-black',
    launchColor: 'text-gray-100'
  }
};

export const defaultRoom = 'warm';

export const defaultMood = 'warm';
