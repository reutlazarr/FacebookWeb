// postFunctions.js

function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const base64String = reader.result.split(',')[1];
            resolve(base64String);
        };
        reader.onerror = (error) => {
            reject(error);
        };
    });
}

export async function addPost(user, newPostContent, postImage, setPostsList) {
    try {
        //const imageBase64 = postImage ? await convertToBase64(postImage) : null;

        console.log("image: " + postImage); // Check if this logs a valid base64 string.

        const postData = {
            date: new Date().toISOString(), // Assuming you want to set the post date here
            content: newPostContent,
            image: postImage,
        };

        const response = await fetch(`http://localhost:8080/api/users/${user.email}/posts/`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const newPost = await response.json();
        setPostsList(postsList => [newPost, ...postsList]);
    } catch (error) {
        console.error("Error adding post:", error);
    }
}

export async function deletePost(user, postId, setPostsList) {
    try {
        const response = await fetch(`http://localhost:8080/api/users/${user.email}/posts/${postId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`,
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        setPostsList(postsList => postsList.filter(post => post._id !== postId));
    } catch (error) {
        console.error("Error deleting post:", error);
    }
}

export async function updatePost(user, postId, updatedContent, updatedImage, postsList, setPostsList) {
    try {
        const formData = new FormData();
        formData.append('content', updatedContent);
        if (updatedImage) {
            formData.append('image', updatedImage);
        }
        const response = await fetch(`http://localhost:8080/api/users/${user.email}/posts/${postId}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${user.token}`,
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const updatedPost = await response.json();
        const updatedPosts = postsList.map(post => {
            if (post.id === postId) {
                return updatedPost;
            }
            return post;
        });
        setPostsList(updatedPosts);
    } catch (error) {
        console.error("Error updating post:", error);
    }
}
