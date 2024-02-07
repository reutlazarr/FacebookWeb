import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import UserDataList from '../data/UserDataList';

const Login = () => {
    const { userDataList } = UserDataList()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState('');
    const [validated, setValidated] = useState(false);
  
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors('');
        // Find user with matching email and password
        const user = userDataList.find(user => user.email === email && user.password === password); 
        if (user) {
            // User authenticated, proceed to next step (e.g., redirect to dashboard)
            setValidated(false);
            console.log('User authenticated:', user);
        } else {
            // No user found with matching credentials, display error message
            setErrors('Invalid email or password');
            setValidated(true);
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
                        <form noValidate onSubmit={handleSubmit}>
                            <div class="card-body">
                                {errors && (<div className="text-danger pb-2">{errors}</div>)}
                                <p className="form-floating mb-3">
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="floatingInput"
                                        placeholder="name@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)} />
                                    <label htmlFor="floatingInput">Email or phone</label>
                                </p>
                                <p className="form-floating mb-3">
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="floatingPassword"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)} />
                                    <label htmlFor="floatingPassword">Password</label>
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