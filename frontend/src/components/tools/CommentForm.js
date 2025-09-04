"use client";
import React, { useState } from 'react';
import Button from '../../app/components/ui/Button';
import Input from '../../app/components/ui/Input';

const CommentForm = ({ toolId, userStageName, onCommentAdded }) => {
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!content.trim()) {
      setError('Please enter a comment');
      return;
    }

    if (content.length > 1000) {
      setError('Comment must be less than 1000 characters');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          toolId,
          content: content.trim(),
          userStageName,
        }),
      });

      if (response.ok) {
        const newComment = await response.json();
        onCommentAdded(newComment);
        setContent('');
        setError('');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to post comment');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="mb-4">
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
          Add your comment
        </label>
        <textarea
          id="comment"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share your thoughts, ask questions, or just chat with the community..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          rows={4}
          maxLength={1000}
          disabled={submitting}
        />
        <div className="mt-1 text-sm text-gray-500 text-right">
          {content.length}/1000 characters
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
          {error}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Posting as: <span className="font-semibold">{userStageName}</span>
        </div>
        <Button
          type="submit"
          variant="primary"
          size="sm"
          disabled={submitting || !content.trim()}
        >
          {submitting ? 'Posting...' : 'Post Comment'}
        </Button>
      </div>
    </form>
  );
};

export default CommentForm;
