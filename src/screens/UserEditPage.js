import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../feed_components/TopBar";
import "./UserEditPage.css";
import { updateUser } from "../utils/UserManager";
import { deleteUser } from "../utils/UserManager";

function UserEditProfile({ user, setUser }) {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const navigate = useNavigate();
    const [newUserName, setNewUserName] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newProfilePicture, setNewProfilePicture] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = {
            name: newUserName,
            password: newPassword,
            profilePicture: newProfilePicture,
        };
        await updateUser(user, userData, setUser);
        // Maybe navigate to a different page or show a success message
    };

    const handleProfilePictureChange = (e) => {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewProfilePicture(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDeleteUser = async () => {
        if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            await deleteUser(user, navigate);
        }
    };

    return (
        <div className={`user-edit-container ${isDarkMode ? "dark-mode" : ""}`}>
            <TopBar user={user} onToggleDarkMode={() => setIsDarkMode(!isDarkMode)} isDarkMode={isDarkMode} />
            <div className="user-edit-form">
                <h3>Update Your Details:</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>New Username: (write a new full name)</label>
                        <input
                            type="text"
                            value={newUserName}
                            onChange={(e) => setNewUserName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>New Password:</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>New Profile Picture:</label>
                        <input
                            type="file"
                            onChange={handleProfilePictureChange}
                        />
                    </div>
                    <button type="submit">Update Details</button>
                </form>
                <button className="delete-user-button" onClick={handleDeleteUser}>Delete User</button>
            </div>
        </div>
    );
}

export default UserEditProfile;
