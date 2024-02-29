import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { getUser, validateUserData, validateUserEmail } from '../utils/Utils';

const Login = ({ setUser, setToken }) => {
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        emailError: "",
        passwordError: "",
    });
  
    function setFinalUser(setUser, credentials) {
        setUser({
          email: credentials.email
        });
    }

    // handle user input changes
    const handleChange = (e) => {
        const { name, value, checked } = e.target; // Get the event targt
        setFormData((prevData) => ({
        ...prevData,
        [name]: value, // Update the names in prevData with thier new value
        [`${name}Error`]: "",
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form fields not empty
        const validateField = (field, errorMessage) => {
            if (!formData[field].trim()) {
            errors[`${field}Error`] = errorMessage;
            isValid = false;
            }
        };

        // Validate form fields
        let isValid = true;
        const errors = {};
        validateField("email", "Email address is required");
        validateField("password", "Password is required");

        // Set formData with the data and matching erors
        setFormData((prevData) => ({
            ...prevData,
            ...errors,
        }));

        if (isValid) {
            // Save user information
            const userData = {
              email: formData.email,
              password: formData.password,
            };

            try {
                const response = await fetch('http://localhost:8080/api/tokens', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),
                });
                if (!response.ok) {
                    if (response.status === 409) {
                        errors.emailError = "Email not found";
                        throw new Error('Email not found');
                    }
                    throw new Error('Failed to log in');
                }
                const json = await response.json();
    
                console.log("login " + json.token); // Process the response data, e.g., save the token
                console.log("login " + userData.email);
                setToken(json.token);
                setFinalUser(setUser, userData);
                // If the form is valid, reset the validation state and submit the form
                setValidated(false);
                // Clean
                setFormData({
                email: "",
                password: "",
                });
                // Navigate to signIn
                navigate('/signIn');
            } catch (error) {
                console.error(error);
                isValid = false;
                // Set formData with the data and matching erors
                setFormData((prevData) => ({
                ...prevData,
                ...errors,
                }));
            }
        }
        // If the form is invalid, display validation feedback
        setValidated(true);
    };
  
    return (   
        <div className="container">
            <div classNames="row">
                <div className="col-sm-6">
                    <h1 className="display-3">Facebook</h1>
                </div>
                <div className="col-sm-6">
                    <div className="card text-center shadow p-4 mb-4 login-card">
                        <div className="card-body"> 
                            <form noValidate validated={validated} onSubmit={handleSubmit}> 
                                <p className="form-floating mb-3">
                                    <input
                                        type="email"
                                        className={`form-control ${validated && formData.emailError ? 'is-invalid' : ''}`}
                                        id="floatingInput"
                                        name="email"
                                        placeholder="name@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        autoComplete="Email" />
                                    <label htmlFor="floatingInput" className="form-label-login">Email address</label>
                                    <div className="invalid-feedback">{formData.emailError}</div>
                                </p>
                                <p className="form-floating mb-3">
                                    <input
                                        type="password"
                                        className={`form-control ${validated && formData.passwordError ? 'is-invalid' : ''}`}
                                        id="floatingPassword"
                                        name="password"
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        autoComplete="password" />
                                    <label htmlFor="floatingPassword" className="form-label-login">Password</label>
                                    <div className="invalid-feedback">{formData.passwordError}</div>
                                </p>
                                <div class="d-grid gap-2">
                                    <button type="submit" className="btn btn-primary btn-lg">Log in</button>
                                </div>
                            </form>
                        </div>
                            <div className="card-footer text-body-secondary">
                                <Link to="/register" className="btn btn-success">Create new account</Link>
                            </div>
                    </div>
                </div>
            </div>
        </div>     
    );
  };
  
  export default Login;