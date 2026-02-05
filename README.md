# Calm Room

A minimal, emotionally grounded web app that functions as a personal sanctuary for rest and emotional recovery.

## Concept

A single-screen application that provides a safe, calm space to return to after work. The app focuses on emotional comfort rather than productivity, featuring three distinct moods with different ambient experiences.

## Features

- **Three Emotional Moods**: Warm (cozy), Chill (calm), Boss (focused)
- **Fullscreen Immersive Experience**: Full-screen backgrounds with gentle overlays
- **Cloud Persistence**: Settings sync across devices via Supabase
- **Ambient Audio**: Low-volume background music with volume controls
- **Minimal Design**: No clutter, no productivity features, just calm
- **Smooth Transitions**: 3-second gentle mood transitions

## Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Copy your project URL and anon key
3. Create a `.env` file in the root directory:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
4. Run this SQL in the Supabase SQL editor:

```sql
-- Create user_settings table
CREATE TABLE user_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  mood TEXT NOT NULL DEFAULT 'warm',
  volume DECIMAL(3,2) NOT NULL DEFAULT 0.3,
  is_muted BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;

-- Create policy for anonymous users
CREATE POLICY "Users can manage their own settings" ON user_settings
  FOR ALL USING (auth.uid() = user_id);

-- Function to handle updated_at
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for updated_at
CREATE TRIGGER handle_user_settings_updated_at
  BEFORE UPDATE ON user_settings
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();
```

### 3. Add Audio Files

Create a `public/music` directory and add three audio files:
- `warm-ambient.mp3` - Soft, warm ambient music
- `chill-ambient.mp3` - Cool, airy lo-fi ambient
- `boss-focus.mp3` - Low, steady focus music

### 4. Run the Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

## Design Philosophy

- **Emotional Safety First**: Every design choice prioritizes calm over impressive features
- **Single Purpose**: This is a space to exist, not to improve
- **Minimal Friction**: Anonymous authentication, no signup required
- **Consistent Layout**: The same room, different emotional lighting
- **No Productivity Signals**: No stats, streaks, or achievements

## Tech Stack

- **Frontend**: React + Vite
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth)
- **Hosting**: Vercel (recommended)

## Deployment

Deploy to Vercel with automatic environment variable detection:
1. Connect your GitHub repository to Vercel
2. Add Supabase environment variables
3. Deploy

The app will work immediately without any additional configuration required.