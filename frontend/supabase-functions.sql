-- Additional Supabase Functions for Comment System
-- Run these in your Supabase SQL Editor after the main setup

-- Function to increment a column value
CREATE OR REPLACE FUNCTION increment(row_id BIGINT, column_name TEXT)
RETURNS INTEGER AS $$
BEGIN
  RETURN (SELECT (column_name::INTEGER + 1) FROM comments WHERE id = row_id);
END;
$$ LANGUAGE plpgsql;

-- Function to get comment with like status for a specific user
CREATE OR REPLACE FUNCTION get_comments_with_likes(tool_id_param TEXT, user_stage_name_param TEXT)
RETURNS TABLE (
  id BIGINT,
  tool_id TEXT,
  user_stage_name TEXT,
  content TEXT,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  likes INTEGER,
  replies INTEGER,
  deleted BOOLEAN,
  edited BOOLEAN,
  reported BOOLEAN,
  report_count INTEGER,
  moderation_status TEXT,
  user_liked BOOLEAN
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    c.id,
    c.tool_id,
    c.user_stage_name,
    c.content,
    c.created_at,
    c.updated_at,
    c.likes,
    c.replies,
    c.deleted,
    c.edited,
    c.reported,
    c.report_count,
    c.moderation_status,
    CASE WHEN cl.id IS NOT NULL THEN TRUE ELSE FALSE END as user_liked
  FROM comments c
  LEFT JOIN comment_likes cl ON c.id = cl.comment_id AND cl.user_stage_name = user_stage_name_param
  WHERE c.tool_id = tool_id_param AND c.deleted = FALSE
  ORDER BY c.created_at DESC;
END;
$$ LANGUAGE plpgsql;

-- Function to get comment statistics
CREATE OR REPLACE FUNCTION get_comment_stats(tool_id_param TEXT)
RETURNS TABLE (
  total_comments INTEGER,
  total_likes INTEGER,
  total_reports INTEGER,
  active_users INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(c.id)::INTEGER as total_comments,
    COALESCE(SUM(c.likes), 0)::INTEGER as total_likes,
    COALESCE(SUM(c.report_count), 0)::INTEGER as total_reports,
    COUNT(DISTINCT c.user_stage_name)::INTEGER as active_users
  FROM comments c
  WHERE c.tool_id = tool_id_param AND c.deleted = FALSE;
END;
$$ LANGUAGE plpgsql;
