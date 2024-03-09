import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./TopBar.css";

function TopBar({ user, onToggleDarkMode, isDarkMode }) {
  const [showDropdown, setShowDropdown] = useState(false);
  //const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Hook for navigation
  const [profile, setProfile] = useState(null);

  function setProfileUser(setProfile, data) {
    setProfile({
      name: data.name,
      profilePicture: data.profilePicture
    });
  }

  const handleLogout = () => {
    navigate("/"); // Redirect to login page
  };

  const profilePage = () => {
    navigate("/Profile");
  };

  const feedTaker = () => {
    navigate("/SignIn");
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (!user.token) return; // If no token is provided, do not attempt to fetch user
      try {
        const response = await fetch(`http://localhost:8080/api/users/${user.email}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${user.token}` // Include the token in the request
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setProfileUser(setProfile, data);

      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [user.token, user.email]); // Dependency on token to refetch if it changes

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
        <a href="#" className="menu-item" title="Home" onClick={feedTaker}>
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
        {profile && (
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src={profile.profilePicture}
                alt="profile"
                className="top-bar-profile-picture"
              />
              {profile.name}
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <button className="dropdown-item" onClick={profilePage}>
                  Profile
                </button>
              </li>
              <li>
                <button className="dropdown-item">
                Settings & privacy
                </button>
              </li>
              <li>
                <button className="dropdown-item">
                Help & support
                </button>
              </li>
              <li>
                <button className="dropdown-item">
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
