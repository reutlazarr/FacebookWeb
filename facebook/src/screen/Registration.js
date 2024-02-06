import React, { useState } from 'react';
import './Registration.css';

function Registration() {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    firstName: 'Mark',
    lastName: 'Otto',
    username: '',
    city: '',
    state: '',
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
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      // Here you can handle the form submission, such as sending the data to the server
      console.log('Form data:', formData);
    }

    setValidated(true);
  };

  return (
    <div class="card">
      <h5 class="card-header text-center">Sign Up</h5>
      <div class="card-body"></div>
      <form noValidate validated={validated} onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-4">
            <label htmlFor="validationCustom01" className="form-label">First name</label>
            <input
              type="text"
              className="form-control"
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
          <div className="col-md-4">
            <label htmlFor="validationCustom02" className="form-label">Last name</label>
            <input
              type="text"
              className="form-control"
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
          <div className="col-md-8">
            <label htmlFor="validationCustom03" className="form-label">Email adress</label>
            <input
              type="text"
              className="form-control"
              id="validationCustom03"
              name="EmailAdress"
              placeholder="name@example.com"
              value={formData.EmailAdress}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">
              Please provide a valid email adress.
            </div>
          </div>
        </div>  
        <div className="row g-3">
          <div className="col-md-8">
            <label htmlFor="validationCustom04" className="form-label">New password</label>
            <input
              type="text"
              className="form-control"
              id="validationCustom04"
              name="NewPassword"
              placeholder="New password"
              value={formData.NewPassworde}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">
              Please provide a valid new password.
            </div>
          </div>
        </div>
        <div className="row g-3">
          <div className="col-md-8">
            <label htmlFor="validationCustom05" className="form-label">Confirm password</label>
            <input
              type="text"
              className="form-control"
              id="validationCustom05"
              name="ConfirmPassword"
              placeholder="Confirm password"
              value={formData.ConfirmPassworde}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">
              Please provide a valid confirm password.
            </div>
          </div>
        </div>    
          {/* Other form fields with similar structure */}
          <div className="col-12">
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
            <button className="btn btn-success" type="SignUp">Sign Up</button>
          </div>
      </form>
    </div>
  );
}

export default Registration;