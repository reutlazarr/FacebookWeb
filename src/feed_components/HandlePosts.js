// postFunctions.js

export async function addPost(user, newPostContent, postImage, setPostsList) {
    try {
        const formData = new FormData();
        formData.append('content', newPostContent);
        if (postImage) {
            formData.append('image', postImage);
        }
        const response = await fetch(`http://localhost:8080/api/users/${user.email}/posts/`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${user.token}`,
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const newPost = await response.json();
        console.log(newPost);
        setPostsList(postsList => [newPost, ...postsList]);
        
    } catch (error) {
        console.error("Error adding post:", error);
    }
}

export async function deletePost(user, postId, setPostsList) {
    try {
        const response = await fetch(`http://localhost:8080/api/users/${user.email}/posts/${postId}/`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`,
            },
        });
        if (!response.ok) {
            console.log('shit!!!!!')
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log('wow ')
        setPostsList(postsList => postsList.filter(post => post.id !== postId));
        console.log('wow wow ')
    } catch (error) {
        console.log(postId)
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
        const response = await fetch(`http://localhost:8080/api/posts/${postId}`, {
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
