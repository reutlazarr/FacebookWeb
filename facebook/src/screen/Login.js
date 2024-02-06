import React, { useState } from 'react';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Here you can handle the form submission, such as validating the inputs and sending them to the server
      console.log('Email:', email);
      console.log('Password:', password);
    };
  
    return (        
        <div class="row">
            <div class="col order-first">
                <h1 class="display-3">Facebook</h1>
            </div>
            <div class="col order-last">
                <div class="card text-center">
                    <form onSubmit={handleSubmit}>
                        <div class="card-body">
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
                        <div class="card-footer text-body-secondary">
                            <button type="register" className="btn btn-success">Create new account</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        
    );
  };
  
  export default Login;