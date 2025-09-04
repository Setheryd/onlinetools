"use client";
import React, { useState, useEffect } from 'react';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import { generateStageName } from '../../utils/stageNameGenerator';

const CommentSection = ({ toolId, toolName }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userStageName, setUserStageName] = useState('');

  useEffect(() => {
    const stageName = localStorage.getItem(`stageName_${toolId}`) || generateStageName();
    localStorage.setItem(`stageName_${toolId}`, stageName);
    setUserStageName(stageName);
    loadComments();
  }, [toolId]);

  const loadComments = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/comments?toolId=${toolId}`);
      if (response.ok) {
        const data = await response.json();
        setComments(data.comments || []);
      } else {
        setError('Failed to load comments');
      }
    } catch (err) {
      setError('Failed to load comments');
    } finally {
      setLoading(false);
    }
  };

  const handleCommentAdded = (newComment) => {
    setComments(prev => [newComment, ...prev]);
    setError('');
  };

  const handleCommentDeleted = (commentId) => {
    setComments(prev => prev.map(comment => 
      comment.id === commentId 
        ? { ...comment, deleted: true }
        : comment
    ));
  };

  const handleCommentUpdated = (commentId, newContent) => {
    setComments(prev => prev.map(comment => 
      comment.id === commentId 
        ? { ...comment, content: newContent, edited: true }
        : comment
    ));
  };

  return (
    <div className="max-w-4xl mx-auto mt-16 p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Community Chat & Comments
        </h2>
        <p className="text-gray-600">
          Share your thoughts, ask questions, or just chat with other users about {toolName}.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
          {error}
        </div>
      )}

      <CommentForm
        toolId={toolId}
        userStageName={userStageName}
        onCommentAdded={handleCommentAdded}
      />

      <CommentList
        comments={comments}
        loading={loading}
        userStageName={userStageName}
        onCommentDeleted={handleCommentDeleted}
        onCommentUpdated={handleCommentUpdated}
      />
    </div>
  );
};

export default CommentSection;
