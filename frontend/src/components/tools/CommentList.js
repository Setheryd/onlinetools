"use client";
import React, { useState } from 'react';
import CommentItem from './CommentItem';
import Button from '../../app/components/ui/Button';

const CommentList = ({ comments, loading, userStageName, onCommentDeleted, onCommentUpdated }) => {
  const [sortBy, setSortBy] = useState('newest'); // newest, oldest, mostLiked

  const sortedComments = [...comments].sort((a, b) => {
    switch (sortBy) {
      case 'oldest':
        return new Date(a.created_at) - new Date(b.created_at);
      case 'mostLiked':
        return (b.likes || 0) - (a.likes || 0);
      case 'newest':
      default:
        return new Date(b.created_at) - new Date(a.created_at);
    }
  });

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="mt-2 text-gray-600">Loading comments...</p>
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p className="text-lg">No comments yet!</p>
        <p className="text-sm">Be the first to start the conversation.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {comments.length} comment{comments.length !== 1 ? 's' : ''}
        </h3>
        <div className="flex gap-2">
          <Button
            variant={sortBy === 'newest' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setSortBy('newest')}
          >
            Newest
          </Button>
          <Button
            variant={sortBy === 'oldest' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setSortBy('oldest')}
          >
            Oldest
          </Button>
          <Button
            variant={sortBy === 'mostLiked' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setSortBy('mostLiked')}
          >
            Most Liked
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {sortedComments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            userStageName={userStageName}
            onDeleted={onCommentDeleted}
            onUpdated={onCommentUpdated}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentList;
