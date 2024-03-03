import React, { useState } from "react";
import "./Post.css";
import Comment from "./Comment";

function Post({
  id,
  content,
  onDelete,
  userName,
  postDate,
  userProfilePicture,
  postImage,
  profile,
  isNewPost,
  onUpdate,
}) {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [showCommentInput, setShowCommentInput] = useState(false); // New state to toggle comment input
  const [liked, setLiked] = useState(false); // State to track likes
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState(content); // Temporary state for edited content
  const [editedImage, setEditedImage] = useState(null); // Temporary state for the new image
  const [showShareOptions, setShowShareOptions] = useState(false);

  const toggleCommentInput = () => {
    setShowCommentInput(!showCommentInput); // Toggle visibility of comment input
  };

  const addComment = () => {
    if (!profile) {
      alert("You must be logged in to post comments.");
      return;
    }
    const newComment = {
      id: new Date().getTime().toString(),
      userName: profile.name,
      commentDate: new Date().toLocaleDateString(),
      content: commentText,
      userProfilePicture: profile.profilePicture,
    };
    setComments([newComment, ...comments]);
    setCommentText(""); // Reset the input field after adding the comment
  };

  const deleteComment = (commentId) => {
    setComments(comments.filter((comment) => comment.id !== commentId));
  };

  const editComment = (commentId, newContent) => {
    setComments(
      comments.map((comment) =>
        comment.id === commentId ? { ...comment, content: newContent } : comment
      )
    );
  };

  const likePost = () => {
    setLiked(!liked); // change to true- tho post got like
  };

  const toggleShareOptions = () => {
    setShowShareOptions(!showShareOptions);
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleImageChange = (e) => {
    setEditedImage(e.target.files[0]);
  };

  const saveChanges = () => {
    if (onUpdate) {
      onUpdate(id, editedContent, editedImage);
      // Assuming `onUpdate` handles the logic for the image, including creating a URL if necessary
      setEditedImage(null); // Clear the temporary edited image state
      setIsEditMode(false); // Exit edit mode
    }
  };

  return (
    <div className="post-container">
      <div className="post-header">
        <div className="author-info">
          <img
            className="profile-picture"
            src={isNewPost ? profile.profilePicture : userProfilePicture}
            alt="Profile"
          />
          <div className="author-details">
            <span className="post-author">{userName}</span>
            <span className="post-date">{postDate}</span>
          </div>
        </div>
        <div className="delete-and-edit">
          <div className="edit">
            <button onClick={toggleEditMode} className="edit-button">
              <i class="bi bi-pencil"></i>
            </button>
          </div>
          <div className="delete">
            <button onClick={() => onDelete(id)} className="delete-button">
              <i className="bi bi-x-lg"></i>
            </button>
          </div>
          <div className="edit"></div>
        </div>
      </div>
      <div className="post-content">
        {isEditMode ? (
          <textarea
            className="edit-textarea"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
        ) : (
          <p>{content}</p>
        )}
      </div>
      {isEditMode ? (
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ margin: "10px 0" }} // Add some spacing
          />
          <button onClick={() => saveChanges()}>Save</button>
          <button onClick={toggleEditMode}>Cancel</button>
        </div>
      ) : (
        postImage && (
          <div className="post-image">
            <img src={postImage} alt="Post" />
          </div>
        )
      )}

      <div className="post-actions">
        <button onClick={likePost} className={`${liked ? "liked-button" : ""}`}>
          <i
            className={`bi ${
              liked ? "bi-hand-thumbs-up-fill" : "bi-hand-thumbs-up"
            }`}
          ></i>{" "}
          Like
        </button>
        <button onClick={toggleCommentInput} aria-label="Comment">
          <i className="bi bi-chat"></i> Comment
        </button>
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="shareDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="bi bi-share"></i> Share
          </button>
          <ul className="dropdown-menu" aria-labelledby="shareDropdown">
            <li>
              <a className="dropdown-item" href="#">
                <i class="bi bi-pencil-square"></i> Share to Feed
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                <i className="bi bi-chat"></i> Send in WhatsApp
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                <i className="bi bi-flag"></i> Share to a page
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="post-comments">
        {comments.map((comment, index) => (
          <Comment
            key={index}
            {...comment}
            onDelete={deleteComment}
            onEdit={editComment}
          />
        ))}
      </div>
      {showCommentInput && (
        <div className="comment-input-section">
          <input id="comment-input"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write a comment..."
            className="comment-input"
          />
          <button onClick={addComment} className="submit-comment">
            Post Comment
          </button>
        </div>
      )}
    </div>
  );
}

export default Post;
