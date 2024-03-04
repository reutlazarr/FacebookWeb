
export const saveUserData = (userData) => {
  const users = JSON.parse(sessionStorage.getItem("users")) || [];
  users.push(userData);
  sessionStorage.setItem("users", JSON.stringify(users));
  //alert('User registered successfully');
};

export const validateUserData = (email, password) => {
  const users = JSON.parse(sessionStorage.getItem("users")) || [];
  return users.some(
    (user) => user.email === email && user.password === password
  );
};

export const validateUserEmail = (email) => {
  const users = JSON.parse(sessionStorage.getItem("users")) || [];
  return users.some((user) => user.email === email);
};

export const getUser = (email, password) => {
  const users = JSON.parse(sessionStorage.getItem("users")) || [];
  return users.find(
    (user) => user.email === email && user.password === password
  );
};

export function deletePost(posts, postId) {
  return posts.filter((post) => post.id !== postId);
}

export function addPost(posts, newPost) {
  return [newPost, ...posts];
}

// call the server, try to register the user with the userData
export const handleRegistration = async (userData) => {
  const response = await fetch('http://localhost:8080/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    if (!response.ok && !response.status === 409) { 
      throw new Error('Failed to register');
    }
  return response;
};

export const login = async (userData) => {
  const response = await fetch('http://localhost:8080/api/tokens', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    if (!response.ok && !response.status === 409) { 
      throw new Error('Failed to log in');
    }
  return response;
};
  
