import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { getUser, validateUserData, validateUserEmail } from '../utils/Utils';

const Login = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [validated, setValidated] = useState(false);
  
    const handleSubmit = (e) => {
        e.preventDefault();
        setEmailError('');
        setPasswordError('');
        
        if (!email) {
            setEmailError('Email is required');
            setValidated(true);
            return;
        }
        // Find user with matching email
        if (validateUserData(email, password)) {
            // Adjust as per your app's routing
            setValidated(false);
            setUser(getUser(email, password));
            navigate('/signIn', { state: { user: user } });
            //alert('Login succesful');
        } 
        if(!validateUserEmail(email)) {
            setEmailError('Email not found');
            setValidated(true);
            return;
        } else if(!password) {
            setPasswordError('Password is required');
            setValidated(true);
            return;
        } else {
            setPasswordError('Invalid password');
            setValidated(true);
            return;
        }
    };
  
    return (   
        <div className="container">
            <div classNames="row">
                <div className="col-sm-6">
                    <h1 className="display-3">Facebook</h1>
                </div>
                <div className="col-sm-6">
                    <div className="card text-center shadow p-4 mb-4 login-card">
                        <form noValidate {...(validated ? { validated: 'true' } : {})} onSubmit={handleSubmit}>
                            <div class="card-body">
                                <p className="form-floating mb-3">
                                    <input
                                        type="email"
                                        className={`form-control ${validated && emailError ? 'is-invalid' : ''}`}
                                        id="floatingInput"
                                        placeholder="name@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)} />
                                    <label htmlFor="floatingInput">Email</label>
                                    {emailError && <div className="invalid-feedback">{emailError}</div>}
                                </p>
                                <p className="form-floating mb-3">
                                    <input
                                        type="password"
                                        className={`form-control ${validated && passwordError ? 'is-invalid' : ''}`}
                                        id="floatingPassword"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)} />
                                    <label htmlFor="floatingPassword">Password</label>
                                    {passwordError && <div className="invalid-feedback">{passwordError}</div>}
                                </p>
                                
                                <div class="d-grid gap-2">
                                    <button type="submit" className="btn btn-primary btn-lg">Log in</button>
                                </div>
                            </div>
                            <div className="card-footer text-body-secondary">
                                <Link to="/register" className="btn btn-success">Create new account</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>     
    );
  };
  
  export default Login;