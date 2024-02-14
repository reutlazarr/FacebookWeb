import React from "react";
import "./TopBar.css";

function TopBar({ user, onLogin }) {
  return (
    <div className="top-bar">
      <div className="top-bar-inner">
        <i className="bi bi-facebook"></i>
        <i className="bi bi-search"></i>
        <input
          type="text"
          placeholder="   Search Facebook"
          className="search-bar"
        />
        <a href="#" className="menu-item" title="Home">
          <i className="bi bi-house-door-fill"></i>
        </a>
        <a href="#" className="menu-item" title="Marketplace">
          <i className="bi bi-shop"></i>
        </a>
        <a href="#" className="menu-item" title="Groups">
          <i className="bi bi-people-fill"></i>
        </a>
        <a href="#" className="menu-item" title="Gaming">
          <i className="bi bi-controller"></i>
        </a>
        <div className="menu-circle">
        <a href="#" className="left-menu-item" title="Menu">
          <i className="bi bi-list"></i>
        </a>
        </div>
        <a href="#" className="left-menu-item" title="Messenger">
          <i className="bi bi-chat-fill"></i>
        </a>
        <a href="#" className="left-menu-item" title="Notifications">
          <i className="bi bi-bell-fill"></i>
        </a>
        {user ? (
          <div className="user-info">
            <img
              src={user.profilePicture}
              alt={user.name}
              className="top-bar-profile-picture"
            />
            <span className="top-bar-username">{user.name}</span>
          </div>
        ) : (
          <button onClick={onLogin}>Login</button>
        )}
      </div>
    </div>
  );
}

export default TopBar;
