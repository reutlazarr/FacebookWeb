import React, { useState } from "react";
import "./Post.css";
import Comment from "./Comment";

function Post({
  content,
  userName,
  postDate,
  userProfilePicture,
  postImage,
  user,
}) {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [showCommentInput, setShowCommentInput] = useState(false); // New state to toggle comment input
  const [likes, setLikes] = useState(0); // State to track likes

  const toggleCommentInput = () => {
    setShowCommentInput(!showCommentInput); // Toggle visibility of comment input
  };

  const addComment = () => {
    if (!user) {
      alert("You must be logged in to post comments.");
      return;
    }
    const newComment = {
      userName: user.username,
      commentDate: new Date().toLocaleDateString(),
      content: commentText,
      userProfilePicture: user.profilePicture,
    };
    setComments([...comments, newComment]);
    setCommentText(""); // Reset the input field after adding the comment
  };

  const likePost = () => {
    setLikes(likes + 1); // Increment likes
  };

  // Placeholder function for share functionality
  const sharePost = () => {
    alert("Post shared! (Placeholder action)");
  };

  return (
    <div className="post-container">
      <div className="post-header">
        <div className="author-info">
          <img
            className="profile-picture"
            src={userProfilePicture}
            alt="Profile"
          />
          <div className="author-details">
            <span className="post-author">{userName}</span>
            <span className="post-date">{postDate}</span>
          </div>
        </div>
      </div>
      <div className="post-content">{content}</div>
      {postImage && (
        <div className="post-image">
          <img src={postImage} alt="Post" />
        </div>
      )}
        <div className="post-actions">
            <button onClick={likePost}>
                <i className="bi bi-hand-thumbs-up"></i> Like
            </button>
            <button onClick={toggleCommentInput}>
                <i className="bi bi-chat"></i> Comment
            </button>
            <button onClick={sharePost}>
                <i className="bi bi-share"></i> Share
            </button>
        </div>
      {likes > 0 && <p>{likes} Likes</p>}
      <div className="post-comments">
        {comments.map((comment, index) => (
          <Comment key={index} {...comment} />
        ))}
      </div>
      {showCommentInput && (
        <div className="comment-input-section">
          <input
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
