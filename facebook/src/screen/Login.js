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



  import React, { useState } from 'react';
import './Registration.css';

function Registration() {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    emailAdress: '',
    newPassword: '',
    confirmPassword: '',
    zip: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let errorMessage = '';
  
    if (name === 'newPassword') {
      // Perform password validation here
      if (value.length < 8) {
        errorMessage = 'Password must be at least 8 characters long.';
      } else if (!/[a-z]/.test(value) || !/[A-Z]/.test(value) || !/\d/.test(value)) {
        errorMessage = 'Password must contain at least one lowercase letter, one uppercase letter, and one digit.';
      }
    } else if (name === 'confirmPassword') {
      // Compare with newPassword
      if (value !== formData.newPassword) {
        errorMessage = 'Passwords do not match.';
      }
    }
  
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      [`${name}Error`]: errorMessage, // Add error message for the field
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      // If the form is invalid, display validation feedback
      event.stopPropagation();
    }
    setValidated(true); // Set validated state after form submission
  };

  return (
    <div className="card">
      <h2 className="card-header text-center fw-bold">Sign Up</h2>
      <div className="card-body"></div>
      <form noValidate validated={validated} onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="px-3 col-md-6">
            <label htmlFor="validationCustom01" className="form-label">First name</label>
            <input
              type="text"
              className={`form-control ${validated ? 'is-invalid' : ''}`}
              id="validationCustom01"
              name="firstName"
              placeholder="First name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">
              Please provide a valid first name.
            </div>
          </div>
          <div className="px-3 col-md-6">
            <label htmlFor="validationCustom02" className="form-label">Last name</label>
            <input
              type="text"
              className={`form-control ${validated ? 'is-invalid' : ''}`}
              id="validationCustom02"
              name="lastName"
              placeholder="Last name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">
              Please provide a valid last name.
            </div>
          </div>
        </div>
        <div className="row g-3">
          <div className="px-3 col-md-12">
            <label htmlFor="validationCustom03" className="form-label">Email adress</label>
            <input
              type="text"
              className={`form-control ${validated ? 'is-invalid' : ''}`}
              id="validationCustom03"
              name="emailAdress"
              placeholder="name@example.com"
              value={formData.emailAdress}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">
              Please provide a valid email adress.
            </div>
          </div>
        </div>  
        <div className="row g-3">
          <div className="px-3 col-md-12">
            <label htmlFor="validationCustom04" className="form-label">New password</label>
            <input
              type="text"
              className={`form-control ${validated || formData.newPasswordError ? 'is-invalid' : ''}`}
              id="validationCustom04"
              name="newPassword"
              placeholder="New password"
              value={formData.newPassworde}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">
              Please provide a valid new password.
            </div>
          </div>
        </div>
        <div className="row g-3">
          <div className="px-3 col-md-12">
            <label htmlFor="validationCustom05" className="form-label">Confirm password</label>
            <input
              type="text"
              className={`form-control ${validated || formData.confirmPasswordError ? 'is-invalid' : ''}`}
              id="validationCustom05"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassworde}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">
              Please provide a valid confirm password.
            </div>
          </div>
        </div>    
          <div className="px-2 col-12">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="invalidCheck" required />
              <label className="form-check-label" htmlFor="invalidCheck">
                Agree to terms and conditions
              </label>
              <div className="invalid-feedback">
                You must agree before submitting.
              </div>
            </div>
          </div>
          <div className="col-12">
            <button className="btn btn-success" type="submit">Sign Up</button>
          </div>
      </form>
    </div>
  );
}

export default Registration;