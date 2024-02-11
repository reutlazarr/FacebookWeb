import "./Comment.css"

function Comment({ content, userName, userProfilePicture, commentDate }){
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
      <div className="comment-content">{content}</div>
      </div>
    )
}
export default Comment;