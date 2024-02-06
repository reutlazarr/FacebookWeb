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
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
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
              className={`form-control ${validated ? 'is-invalid' : ''}`}
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
              className={`form-control ${validated ? 'is-invalid' : ''}`}
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