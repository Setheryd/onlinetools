-- Supabase Database Setup for Comment System
-- Run this in your Supabase SQL Editor

-- Enable Row Level Security (RLS)
ALTER TABLE IF EXISTS comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS comment_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS comment_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS rate_limits ENABLE ROW LEVEL SECURITY;

-- Comments table
CREATE TABLE IF NOT EXISTS comments (
    id BIGSERIAL PRIMARY KEY,
    tool_id VARCHAR(100) NOT NULL,
    user_stage_name VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    likes INTEGER DEFAULT 0,
    replies INTEGER DEFAULT 0,
    deleted BOOLEAN DEFAULT FALSE,
    edited BOOLEAN DEFAULT FALSE,
    reported BOOLEAN DEFAULT FALSE,
    report_count INTEGER DEFAULT 0,
    moderation_status VARCHAR(20) DEFAULT 'approved',
    user_ip VARCHAR(45),
    user_agent TEXT
);

-- User sessions table (for tracking stage names)
CREATE TABLE IF NOT EXISTS user_sessions (
    id BIGSERIAL PRIMARY KEY,
    session_id VARCHAR(255) UNIQUE NOT NULL,
    user_stage_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_activity TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    tool_id VARCHAR(100) NOT NULL
);

-- Comment reports table
CREATE TABLE IF NOT EXISTS comment_reports (
    id BIGSERIAL PRIMARY KEY,
    comment_id BIGINT REFERENCES comments(id) ON DELETE CASCADE,
    reporter_stage_name VARCHAR(100) NOT NULL,
    reason VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'pending'
);

-- Comment likes table (for tracking who liked what)
CREATE TABLE IF NOT EXISTS comment_likes (
    id BIGSERIAL PRIMARY KEY,
    comment_id BIGINT REFERENCES comments(id) ON DELETE CASCADE,
    user_stage_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(comment_id, user_stage_name)
);

-- Rate limiting table
CREATE TABLE IF NOT EXISTS rate_limits (
    id BIGSERIAL PRIMARY KEY,
    identifier VARCHAR(255) NOT NULL,
    action VARCHAR(50) NOT NULL,
    count INTEGER DEFAULT 1,
    window_start TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(identifier, action)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_comments_tool_id ON comments(tool_id);
CREATE INDEX IF NOT EXISTS idx_comments_created_at ON comments(created_at);
CREATE INDEX IF NOT EXISTS idx_comments_user_stage_name ON comments(user_stage_name);
CREATE INDEX IF NOT EXISTS idx_comments_moderation_status ON comments(moderation_status);
CREATE INDEX IF NOT EXISTS idx_user_sessions_tool_id ON user_sessions(tool_id);
CREATE INDEX IF NOT EXISTS idx_comment_reports_comment_id ON comment_reports(comment_id);
CREATE INDEX IF NOT EXISTS idx_comment_likes_comment_id ON comment_likes(comment_id);
CREATE INDEX IF NOT EXISTS idx_rate_limits_identifier ON rate_limits(identifier);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_comments_updated_at ON comments;
CREATE TRIGGER update_comments_updated_at 
    BEFORE UPDATE ON comments 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Function to clean up old rate limit entries (can be called manually or via API)
CREATE OR REPLACE FUNCTION cleanup_rate_limits()
RETURNS void AS $$
BEGIN
    DELETE FROM rate_limits 
    WHERE window_start < CURRENT_TIMESTAMP - INTERVAL '1 hour';
END;
$$ language 'plpgsql';

-- Row Level Security Policies

-- Comments table policies
CREATE POLICY "Comments are viewable by everyone" ON comments
    FOR SELECT USING (deleted = FALSE);

CREATE POLICY "Users can insert their own comments" ON comments
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update their own comments" ON comments
    FOR UPDATE USING (user_stage_name = current_setting('app.current_user_stage_name', true));

CREATE POLICY "Users can delete their own comments" ON comments
    FOR DELETE USING (user_stage_name = current_setting('app.current_user_stage_name', true));

-- User sessions table policies
CREATE POLICY "User sessions are viewable by everyone" ON user_sessions
    FOR SELECT USING (true);

CREATE POLICY "Users can insert their own sessions" ON user_sessions
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update their own sessions" ON user_sessions
    FOR UPDATE USING (user_stage_name = current_setting('app.current_user_stage_name', true));

-- Comment reports table policies
CREATE POLICY "Comment reports are viewable by everyone" ON comment_reports
    FOR SELECT USING (true);

CREATE POLICY "Users can insert reports" ON comment_reports
    FOR INSERT WITH CHECK (true);

-- Comment likes table policies
CREATE POLICY "Comment likes are viewable by everyone" ON comment_likes
    FOR SELECT USING (true);

CREATE POLICY "Users can insert likes" ON comment_likes
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can delete their own likes" ON comment_likes
    FOR DELETE USING (user_stage_name = current_setting('app.current_user_stage_name', true));

-- Rate limits table policies
CREATE POLICY "Rate limits are viewable by everyone" ON rate_limits
    FOR SELECT USING (true);

CREATE POLICY "Rate limits can be inserted" ON rate_limits
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Rate limits can be updated" ON rate_limits
    FOR UPDATE USING (true);

-- Insert some sample data for testing
INSERT INTO comments (tool_id, user_stage_name, content) VALUES
('qr-code-generator', 'Mysterious Panda', 'This QR code generator is amazing! So easy to use.'),
('qr-code-generator', 'Quantum Wizard', 'I love how you can customize the colors and size.'),
('qr-code-generator', 'Azure Dragon', 'Perfect for my business cards. Thanks!')
ON CONFLICT DO NOTHING;
