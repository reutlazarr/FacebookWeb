import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TopBar.css";

function TopBar({ user, onToggleDarkMode, isDarkMode }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate(); // Hook for navigation


  const handleLogout = () => {
    // Perform logout logic here (e.g., clearing local storage, resetting user state)
    navigate("/"); // Redirect to login page
  };

  return (
    <div className={`top-bar ${isDarkMode ? "dark-mode-topbar" : ""}`}>
      <div className="top-bar-inner">
        <i className="bi bi-facebook"></i>
        <i className="bi bi-search"></i>
        <input
          type="text"
          placeholder="Search Facebook"
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
        {user && (
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src={user.image}
                alt="profile"
                className="top-bar-profile-picture"
              />
              {user.name}
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <button className="dropdown-item" onClick={handleLogout}>
                  Settings & privacy
                </button>
              </li>
              <li>
                <button className="dropdown-item" onClick={handleLogout}>
                  Help & support
                </button>
              </li>
              <li>
                <button className="dropdown-item" onClick={handleLogout}>
                  Display & accessibility
                </button>
              </li>
              <li>
                <button className="dropdown-item" onClick={handleLogout}>
                  Give feedback
                </button>
              </li>
              <li>
                <button className="dropdown-item" onClick={handleLogout}>
                  Log out
                </button>
              </li>
            </ul>
          </div>
        )}
        <button onClick={onToggleDarkMode} className="dark-mode-toggle">
          <i className="bi bi-moon-fill"></i>{" "}
          {/* Icon for toggling dark mode */}
        </button>
      </div>
    </div>
  );
}

export default TopBar;
