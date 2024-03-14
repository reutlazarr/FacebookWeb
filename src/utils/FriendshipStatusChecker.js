import React, { useState, useEffect } from 'react';

function FriendshipStatusChecker({ user, recipientEmail }) {
    const [friendshipStatus, setFriendshipStatus] = useState(null);
    const [errorMessage, setErrorMessage] = useState(''); // Correctly initialized here


    useEffect(() => {
        checkFriendshipStatus();
    }, [user.token, recipientEmail]);

    const checkFriendshipStatus = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/users/${user.email}/friends/${recipientEmail}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            setFriendshipStatus(result.status);

        } catch (error) {
            console.error("Error checking friendship status:", error);
            setErrorMessage('An error occurred while checking the friendship status.');
        }
    };


    const sendFriendRequest = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/users/${recipientEmail}/friends`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                },
                body: JSON.stringify({ recipientEmail }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Friend request sent:', result);
            checkFriendshipStatus();
            //setFriendshipStatus("pending");
        } catch (error) {
            console.error("Error sending friend request:", error);
        }
    };


    const cancelFriendRequest = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/users/${user.email}/friends/${recipientEmail}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Friend request canceled:', result);
            checkFriendshipStatus();
            //setFriendshipStatus('There is no friend request');
            // setErrorMessage('');  // Clear any existing error message
        } catch (error) {
            // console.error("Error canceling friend request:", error);
            // setErrorMessage('An error occurred while canceling the friend request.');
        }
    };

    const unfriendUser = async () => {
        // Similar implementation for unfriending a user
    };

    const respondToRequest = async (action) => {
        try {
            const response = await fetch(`http://localhost:8080/api/users/${user.email}/friends/${recipientEmail}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ response: action }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Response to friend request:', result);

            // Re-check the friendship status after responding to the request
            //checkFriendshipStatus();
            checkFriendshipStatus();
        } catch (error) {
            console.error(`Error ${action}ing friend request:`, error);
            setErrorMessage(`An error occurred while ${action}ing the friend request.`);
        }
    };

    const renderButton = () => {
        switch (friendshipStatus) {
            case 'Pending':
                return <button onClick={() => cancelFriendRequest()}>Cancel Request</button>;
            case 'Received':
                return <>
                    <p>You got a friend request!</p>
                    <button onClick={() => respondToRequest('accept')}>Accept</button>
                    <button onClick={() => respondToRequest('reject')}>Reject</button>
                </>;
            case 'Accepted':
                return <button onClick={unfriendUser}>Unfriend</button>;
            case 'None':
                return <button onClick={() => sendFriendRequest()}>Add Friend</button>;
            default:
                return <p> </p>;
        }
    };

    return (
        <div>
            {errorMessage ? <p className="error-message">{errorMessage}</p> : renderButton()}
        </div>
    );
}

export default FriendshipStatusChecker;