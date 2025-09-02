"use client";
import React, { useState } from 'react';
import Button from '../../app/components/ui/Button';

const CommentItem = ({ comment, userStageName, onDeleted, onUpdated }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [isLiking, setIsLiking] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isReporting, setIsReporting] = useState(false);

  const isOwner = comment.user_stage_name === userStageName;
  const canEdit = isOwner && !comment.deleted;
  const canDelete = isOwner && !comment.deleted;

  const handleEdit = async () => {
    if (!editContent.trim()) return;
    
    try {
      const response = await fetch(`/api/comments/${comment.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: editContent.trim() }),
      });

      if (response.ok) {
        onUpdated(comment.id, editContent.trim());
        setIsEditing(false);
      }
    } catch (err) {
      console.error('Failed to update comment:', err);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this comment?')) return;
    
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/comments/${comment.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        onDeleted(comment.id);
      }
    } catch (err) {
      console.error('Failed to delete comment:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleLike = async () => {
    if (isLiking) return;
    
    setIsLiking(true);
    try {
      const response = await fetch(`/api/comments/${comment.id}/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userStageName }),
      });

      if (response.ok) {
        // Update local state optimistically
        comment.likes = (comment.likes || 0) + 1;
        comment.userLiked = true;
      }
    } catch (err) {
      console.error('Failed to like comment:', err);
    } finally {
      setIsLiking(false);
    }
  };

  const handleReport = async () => {
    if (isReporting) return;
    
    setIsReporting(true);
    try {
      const response = await fetch(`/api/comments/${comment.id}/report`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          reporterStageName: userStageName,
          reason: 'Inappropriate content'
        }),
      });

      if (response.ok) {
        alert('Comment reported successfully. Thank you for helping keep our community safe.');
      }
    } catch (err) {
      console.error('Failed to report comment:', err);
    } finally {
      setIsReporting(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid date';
    
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${Math.floor(diffInHours)}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString();
  };

  if (comment.deleted) {
    return (
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-gray-500 italic">This comment has been deleted.</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
      {isEditing ? (
        <div className="space-y-3">
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            rows={3}
            maxLength={1000}
          />
          <div className="flex gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={handleEdit}
              disabled={!editContent.trim()}
            >
              Save
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setIsEditing(false);
                setEditContent(comment.content);
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-blue-600">{comment.user_stage_name}</span>
              <span className="text-sm text-gray-500">
                {formatDate(comment.created_at)}
                {comment.edited && ' (edited)'}
              </span>
            </div>
            <div className="flex gap-2">
              {canEdit && (
                <Button
                  variant="outline"
                  size="xs"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </Button>
              )}
              {canDelete && (
                <Button
                  variant="outline"
                  size="xs"
                  onClick={handleDelete}
                  disabled={isDeleting}
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </Button>
              )}
              {!isOwner && (
                <Button
                  variant="outline"
                  size="xs"
                  onClick={handleReport}
                  disabled={isReporting}
                >
                  {isReporting ? 'Reporting...' : 'Report'}
                </Button>
              )}
            </div>
          </div>
          
          <p className="text-gray-800 mb-3 whitespace-pre-wrap">{comment.content}</p>
          
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <button
              onClick={handleLike}
              disabled={isLiking}
              className={`flex items-center gap-1 hover:text-blue-600 transition-colors ${
                comment.userLiked ? 'text-blue-600' : ''
              }`}
            >
              <span>👍</span>
              <span>{comment.likes || 0}</span>
            </button>
            <span>{comment.replies || 0} replies</span>
          </div>
        </>
      )}
    </div>
  );
};

export default CommentItem;
