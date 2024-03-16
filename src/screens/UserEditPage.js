import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../feed_components/TopBar";
import Menu from "../feed_components/Menu";
import { useLocation } from "react-router-dom";
import "./UserProfile.css"

function UserProfile({ user }) {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const location = useLocation();
    const { author } = location.state || {}; // Get author from state; default to an empty object if state is undefined

    // This ensures the feed will display only if the user signIn and have a token
    useEffect(() => {
        if (!user.token) {
            navigate("/");
        } else {
        }
    }, [user, navigate]);


    function setProfileUser(setProfile, data) {
        setProfile({
            name: data.name,
            profilePicture: data.profilePicture
        });
    }

    useEffect(() => {
        const fetchUser = async () => {
            if (!user.token) return; // If no token is provided, do not attempt to fetch user
            try {
                const response = await fetch(`http://localhost:8080/api/users/${author.email}`, {
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
        <div className={`feed-container ${isDarkMode ? "dark-mode" : ""}`}>
            <TopBar user={user} onToggleDarkMode={() => setIsDarkMode(!isDarkMode)} isDarkMode={isDarkMode} />
            <div className="main-content">
                <Menu />
          
            </div>
        </div>
    );
}

export default UserProfile;