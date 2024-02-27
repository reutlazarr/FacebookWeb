import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./TopBar.css";

function TopBar({ onToggleDarkMode, isDarkMode, token }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return; // If no token is provided, do not attempt to fetch user

      try {
        console.log(token);
        console.log(token.token);
        const response = await fetch("http://localhost:8080/api/users/:id", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${token.token}` // Include the token in the request
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data)
          console.log(data.user)
          setUser(data.user); // Assuming the response contains an object with the user key
        } else {
          // Handle errors, e.g., token expired, user not found
          console.error("Failed to fetch user");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [token]); // Dependency on token to refetch if it changes

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
