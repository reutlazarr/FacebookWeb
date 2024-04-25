import React, { useState } from "react";
import "./Post.css";
import Comment from "./Comment";
import { useNavigate } from "react-router-dom";

function Post({
  id,
  author,
  content,
  onDelete,
  postDate,
  postImage,
  profile,
  isNewPost,
  onUpdate,
  likePost,
}) {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [showCommentInput, setShowCommentInput] = useState(false); // New state to toggle comment input
  const [liked, setLiked] = useState(false); // State to track likes
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState(content); // Temporary state for edited content
  const [editedImage, setEditedImage] = useState(null);// Temporary state for the new image
  const [showShareOptions, setShowShareOptions] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  const fetchUserPosts = (author) => {
    navigate("/UserProfile", { state: { author: author } });
  };

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
      userName: author.name,
      commentDate: new Date().toLocaleDateString(),
      content: commentText,
      userProfilePicture: author.profilePicture,
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

  const handleLikePost = () => {
    setLiked(!liked); // Toggle the liked state
    likePost(id); // Call the likePost function passed from the parent, with the post's ID
  };


  // const likePost = () => {
  //   setLiked(!liked); // Toggle the liked state

  //   // Send a request to the server to update the like status
  //   fetch(`http://localhost:8080/api/users/${user.email}/posts/${id}`, {
  //     method: 'POST', // Or PATCH, depending on your API design
  //     headers: {
  //       'Authorization': `Bearer ${user.token}`, // Assuming you have a user object with a token
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log('Like updated:', data);
  //     })
  //     .catch(error => {
  //       console.error('Error updating like:', error);
  //     });
  // };

  const toggleShareOptions = () => {
    setShowShareOptions(!showShareOptions);
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the first selected file
    if (file) {
      const reader = new FileReader(); // Create a new FileReader instance
      reader.onload = () => {
        setEditedImage(reader.result); // Set the selected image to the reader's result (base64 encoded)
      };
      reader.readAsDataURL(file); // Read the file as a Data URL
    }
  };


  const saveChanges = () => {
    if (onUpdate) {
      onUpdate(editedContent, editedImage || postImage);
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
            src={author.profilePicture}
            alt="Profile"
            onClick={() => fetchUserPosts(author)}
          />
          <div className="author-details">
            <span className="post-author">{author.name}</span>
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
        <button onClick={handleLikePost} className={`${liked ? "liked-button" : ""}`}>

          <i
            className={`bi ${liked ? "bi-hand-thumbs-up-fill" : "bi-hand-thumbs-up"
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
