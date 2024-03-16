// Function to update user details
export async function updateUser(user, userId, userData, setUser) {
    try {
        const response = await fetch(`http://foo.com/api/users/${userId}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const updatedUser = await response.json();
        console.log("User updated successfully:", updatedUser);
        setUser(updatedUser); // Update user state if necessary
    } catch (error) {
        console.error("Error updating user:", error);
    }
}

// Function to delete user
export async function deleteUser(user, userId, navigate) {
    try {
        const response = await fetch(`http://foo.com/api/users/${userId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        console.log("User deleted successfully");
        navigate('/login'); // Redirect to login or other appropriate page after deletion
    } catch (error) {
        console.error("Error deleting user:", error);
    }
}
