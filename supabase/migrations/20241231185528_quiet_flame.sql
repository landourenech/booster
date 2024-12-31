/*
  # Initial Schema Setup for Video Engagement Platform

  1. New Tables
    - users
      - Custom user profile data
      - Points tracking
      - Watch time tracking
    - videos
      - Video metadata
      - View counts
      - Required points for viewing
    - video_views
      - Track individual video views
      - Record watch time

  2. Security
    - RLS policies for all tables
    - Secure access patterns
*/

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  username TEXT UNIQUE NOT NULL,
  points INTEGER DEFAULT 0,
  total_watch_time INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Videos table
CREATE TABLE IF NOT EXISTS videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) NOT NULL,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  required_points INTEGER DEFAULT 0,
  views INTEGER DEFAULT 0,
  total_watch_time INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Video views table
CREATE TABLE IF NOT EXISTS video_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id UUID REFERENCES videos(id) NOT NULL,
  user_id UUID REFERENCES users(id) NOT NULL,
  watch_time INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(video_id, user_id)
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_views ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Videos are viewable by all authenticated users"
  ON videos
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create their own videos"
  ON videos
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can record their video views"
  ON video_views
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Function to record video view and update points
CREATE OR REPLACE FUNCTION record_video_view(
  video_id UUID,
  watch_time INTEGER
) RETURNS VOID AS $$
BEGIN
  -- Update video stats
  UPDATE videos
  SET 
    views = views + 1,
    total_watch_time = total_watch_time + watch_time
  WHERE id = video_id;
  
  -- Update user watch time
  UPDATE users
  SET 
    total_watch_time = total_watch_time + watch_time,
    points = points + (watch_time / 10) -- 1 point per 10 seconds
  WHERE id = auth.uid();
  
  -- Record the view
  INSERT INTO video_views (video_id, user_id, watch_time)
  VALUES (video_id, auth.uid(), watch_time)
  ON CONFLICT (video_id, user_id)
  DO UPDATE SET watch_time = video_views.watch_time + EXCLUDED.watch_time;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;