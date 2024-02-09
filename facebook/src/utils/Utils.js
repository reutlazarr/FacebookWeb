export const saveUserData = (userData) => {
    const users = JSON.parse(sessionStorage.getItem('users')) || [];
    users.push(userData);
    sessionStorage.setItem('users', JSON.stringify(users));
    //alert('User registered successfully');
  };
  
  export const validateUserData = (email, password) => {
    const users = JSON.parse(sessionStorage.getItem('users')) || [];
    return users.some(user => user.email === email && user.password === password);
  };

  export const validateUserEmail = (email) => {
    const users = JSON.parse(sessionStorage.getItem('users')) || [];
    return users.some(user => user.email === email);
  }