import React, { useState } from "react";
import { CommentGet } from "../../Models/Comment";
import { useAuth } from "../../Context/useAuth"; 
import { commentDeleteAPI, commentPutAPI } from "../../Services/CommentService";
import { toast } from "react-toastify";

type Props = {
  comment: CommentGet;
  onCommentChange: () => void;
};

const StockCommentListItem = ({ comment, onCommentChange }: Props) => {
  const { user } = useAuth(); 
  const isOwner = user?.userName === comment.createdBy;

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(comment.title);
  const [editContent, setEditContent] = useState(comment.content);
  
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!comment.id) return;

    try {
      await commentDeleteAPI(comment.id);
      toast.success("Comment deleted");
      setShowDeleteModal(false);
      onCommentChange();
    } catch (e) {
      toast.error("Failed to delete comment");
      setShowDeleteModal(false);
    }
  };

  const handleUpdate = async () => {
    if (!comment.id) return;

    if (!editTitle.trim() || !editContent.trim()) {
      toast.warning("Title and content cannot be empty");
      return;
    }

    try {
      await commentPutAPI(comment.id, editTitle, editContent);
      toast.success("Comment updated");
      setIsEditing(false);
      onCommentChange(); 
    } catch (e) {
      toast.error("Failed to update comment");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"
    });
  };

  return (
    <>
      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm mb-3">
        <div className="flex justify-between items-start mb-2">
          <div className="flex flex-col">
            <span className="font-bold text-brandBlue">@{comment.createdBy}</span>
            <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
              <span>{formatDate(comment.createdOn)}</span>
            </div>
          </div>

          {isOwner && !isEditing && (
            <div className="flex gap-2">
              <button 
                onClick={() => setIsEditing(true)} 
                className="text-slate-400 hover:text-brandBlue text-sm font-medium transition-colors"
              >
                Edit
              </button>
              <button 
                onClick={handleDeleteClick} 
                className="text-slate-400 hover:text-red-500 text-sm font-medium transition-colors"
              >
                Delete
              </button>
            </div>
          )}
        </div>

        {isEditing ? (
          <div className="mt-3 flex flex-col gap-2">
            <input 
              type="text" 
              value={editTitle} 
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brandBlue"
            />
            <textarea 
              value={editContent} 
              onChange={(e) => setEditContent(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brandBlue resize-none"
            />
            <div className="flex gap-2 justify-end mt-2">
              <button 
                onClick={() => {
                  setIsEditing(false);
                  setEditTitle(comment.title); 
                  setEditContent(comment.content);
                }} 
                className="px-3 py-1.5 text-sm text-slate-500 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleUpdate} 
                className="px-3 py-1.5 text-sm text-white bg-brandBlue rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-2">
            <h4 className="font-semibold text-slate-800 text-md">{comment.title}</h4>
            <p className="text-slate-600 text-sm mt-1 whitespace-pre-wrap">{comment.content}</p>
          </div>
        )}
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 animate-fade-in-up">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mb-4 mx-auto">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-center text-slate-900 mb-2">Delete Note?</h3>
            <p className="text-sm text-center text-slate-500 mb-6">
              Are you sure you want to delete this note? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDelete}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors shadow-sm shadow-red-200"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StockCommentListItem;