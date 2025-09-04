-- Database schema for the comment system
-- This shows what you'd need to implement in production

-- Comments table
CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
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
    moderation_status VARCHAR(20) DEFAULT 'approved', -- approved, pending, rejected
    user_ip VARCHAR(45), -- For rate limiting
    user_agent TEXT -- For moderation context
);

-- User sessions table (for tracking stage names)
CREATE TABLE user_sessions (
    id SERIAL PRIMARY KEY,
    session_id VARCHAR(255) UNIQUE NOT NULL,
    user_stage_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_activity TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    tool_id VARCHAR(100) NOT NULL
);

-- Comment reports table
CREATE TABLE comment_reports (
    id SERIAL PRIMARY KEY,
    comment_id INTEGER REFERENCES comments(id) ON DELETE CASCADE,
    reporter_stage_name VARCHAR(100) NOT NULL,
    reason VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'pending' -- pending, reviewed, dismissed
);

-- Comment likes table (for tracking who liked what)
CREATE TABLE comment_likes (
    id SERIAL PRIMARY KEY,
    comment_id INTEGER REFERENCES comments(id) ON DELETE CASCADE,
    user_stage_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(comment_id, user_stage_name)
);

-- Rate limiting table
CREATE TABLE rate_limits (
    id SERIAL PRIMARY KEY,
    identifier VARCHAR(255) NOT NULL, -- user_stage_name + tool_id + action
    action VARCHAR(50) NOT NULL,
    count INTEGER DEFAULT 1,
    window_start TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(identifier, action)
);

-- Indexes for performance
CREATE INDEX idx_comments_tool_id ON comments(tool_id);
CREATE INDEX idx_comments_created_at ON comments(created_at);
CREATE INDEX idx_comments_user_stage_name ON comments(user_stage_name);
CREATE INDEX idx_comments_moderation_status ON comments(moderation_status);
CREATE INDEX idx_user_sessions_tool_id ON user_sessions(tool_id);
CREATE INDEX idx_comment_reports_comment_id ON comment_reports(comment_id);
CREATE INDEX idx_comment_likes_comment_id ON comment_likes(comment_id);
CREATE INDEX idx_rate_limits_identifier ON rate_limits(identifier);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_comments_updated_at 
    BEFORE UPDATE ON comments 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Function to clean up old rate limit entries
CREATE OR REPLACE FUNCTION cleanup_rate_limits()
RETURNS void AS $$
BEGIN
    DELETE FROM rate_limits 
    WHERE window_start < CURRENT_TIMESTAMP - INTERVAL '1 hour';
END;
$$ language 'plpgsql';

-- Example queries for common operations:

-- Get comments for a tool
-- SELECT * FROM comments WHERE tool_id = 'qr-code-generator' AND deleted = FALSE ORDER BY created_at DESC;

-- Get user's stage name for a tool
-- SELECT user_stage_name FROM user_sessions WHERE session_id = $1 AND tool_id = $2;

-- Check rate limit
-- SELECT count FROM rate_limits WHERE identifier = $1 AND action = $2 AND window_start > CURRENT_TIMESTAMP - INTERVAL '1 minute';

-- Get reported comments for moderation
-- SELECT c.*, COUNT(cr.id) as report_count 
-- FROM comments c 
-- LEFT JOIN comment_reports cr ON c.id = cr.comment_id 
-- WHERE c.reported = TRUE 
-- GROUP BY c.id 
-- ORDER BY report_count DESC;
