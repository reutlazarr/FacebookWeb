import "./Comment.css";
import React, { useState, useRef, useEffect } from "react";

function Comment({
  id,
  content,
  userName,
  userProfilePicture,
  commentDate,
  onDelete,
  onEdit,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const editInputRef = useRef(null);

  const handleEdit = () => {
    onEdit(id, editedContent);
    setIsEditing(false);
  };

  useEffect(() => {
    if (isEditing) {
      editInputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <div className="comment">
      <div className="author-info">
        <img
          className="profile-picture"
          src={userProfilePicture}
          alt="Profile"
        />
        <div className="author-details">
          <span className="comment-author">{userName}</span>
          <span className="comment-date">{commentDate}</span>
        </div>
      </div>
      {isEditing ? (
        <input
          ref={editInputRef}
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
        />
      ) : (
        <div className="comment-content">{content}</div>
      )}
      <div className="comment-actions">
        {isEditing ? (
          <>
            <button className="btn-save" onClick={handleEdit}>Save</button>
            <button className="btn-cancel" onClick={() => setIsEditing(false)}>Cancel</button>
          </>
        ) : (
          <>
            <button className="btn-edit" onClick={() => setIsEditing(true)}>
              Edit
            </button>
            <button className="btn-delete" onClick={() => onDelete(id)}>
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Comment;
