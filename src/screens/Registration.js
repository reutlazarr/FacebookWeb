import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Registration.css";
import { saveUserData } from "../utils/Utils";

function Registration({ setUser }) {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
    selectedImage: null,
    firstNameError: "",
    lastNameError: "",
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
    agreeTermsError: "",
  });

  function setFinalUser(setUser, formData) {
    setUser({
      name: formData.firstName + " " + formData.lastName,
      image: formData.selectedImage,
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
    if (name === "agreeTerms") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked, // Update the checkbox agreeTerms
        [`${name}Error`]: "",
      }));
    }
  };

  // handle user input image changes
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the first selected file
    if (file) {
      const reader = new FileReader(); // Create a new FileReader instance
      reader.onload = () => {
        setFormData((prevData) => ({
          ...prevData,
          selectedImage: reader.result, // Set the selected image to the reader's result (base64 encoded)
        }));
      };
      reader.readAsDataURL(file); // Read the file as a Data URL
    }
  };

  // handle form submit
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission

    // Validate form fields not empty
    const validateField = (field, errorMessage) => {
      if (!formData[field].trim()) {
        errors[`${field}Error`] = errorMessage;
        isValid = false;
      }
    };

    const validateEmail = () => {
      // Validte email in format <name@gnail.com>
      if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.emailError = "Email address is invalid";
        isValid = false;
      }
    };

    const validatePassword = () => {
      // Validte password with at least 8 characters long
      if (formData.password.length < 8) {
        errors.passwordError = "Password must be at least 8 characters long";
        isValid = false;
        // Validte password has at least 1 lowercase letter, 1 uppercase letter and 1 digit
      } else if (
        !/[a-z]/.test(formData.password) ||
        !/[A-Z]/.test(formData.password) ||
        !/\d/.test(formData.password)
      ) {
        errors.passwordError =
          "Password must contain at least one lowercase letter, one uppercase letter, and one digit";
        isValid = false;
      }
    };

    // Validate form fields
    let isValid = true;
    const errors = {};
    validateField("firstName", "First name is required");
    validateField("lastName", "Last name is required");
    validateField("email", "Email address is required");
    validateEmail();
    validateField("password", "Password is required");
    validatePassword();
    // Validte confirm password match to password
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPasswordError = "Passwords do not match";
      isValid = false;
    }
    // Validte user agree to terms
    if (!formData.agreeTerms) {
      errors.agreeTermsError = "You must agree to terms and conditions";
      isValid = false;
    }

    // Set formData with the data and matching erors
    setFormData((prevData) => ({
      ...prevData,
      ...errors,
    }));

    if (isValid) {
      // If the form is valid, reset the validation state and submit the form
      setValidated(false);
      // Save user information
      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        selectedImage: formData.selectedImage,
      };
      saveUserData(userData);
      // Clean
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreeTerms: false,
        selectedImage: null,
      });
      // Navigate back to the login page
      navigate("/");
    } else {
      // If the form is invalid, display validation feedback
      setValidated(true);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6"></div>
        <div className="card shadow p-4 mb-4 registration-card">
          <div className="card-header">
            <Link
              to="/"
              className="btn btn-lg btn-close"
              aria-label="Close"
            ></Link>
            <h2 className="text-center fw-bold">Sign Up</h2>
          </div>
          <div className="card-body"></div>
          <form noValidate validated={validated} onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="px-3 col-md-6">
                <label htmlFor="validationCustom01" className="form-label">
                  First name
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    validated && formData.firstNameError ? "is-invalid" : ""
                  }`}
                  id="validationCustom01"
                  name="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  autoComplete="First name"
                />
                <div className="invalid-feedback">
                  {formData.firstNameError}
                </div>
              </div>
              <div className="px-3 col-md-6">
                <label htmlFor="validationCustom02" className="form-label">
                  Last name
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    validated && formData.lastNameError ? "is-invalid" : ""
                  }`}
                  id="validationCustom02"
                  name="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  autoComplete="Last name"
                />
                <div className="invalid-feedback">{formData.lastNameError}</div>
              </div>
            </div>
            <div className="row g-3">
              <div className="px-3 col-md-12">
                <label htmlFor="validationCustom03" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className={`form-control ${
                    validated && formData.emailError ? "is-invalid" : ""
                  }`}
                  id="validationCustom03"
                  name="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="Email address"
                />
                <div className="invalid-feedback">{formData.emailError}</div>
              </div>
            </div>
            <div className="row g-3">
              <div className="px-3 col-md-12">
                <label htmlFor="validationCustom04" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className={`form-control ${
                    validated && formData.passwordError ? "is-invalid" : ""
                  }`}
                  id="validationCustom04"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete="password"
                />
                <div className="invalid-feedback">{formData.passwordError}</div>
              </div>
            </div>
            <div className="row g-3">
              <div className="px-3 col-md-12">
                <label htmlFor="validationCustom05" className="form-label">
                  Confirm password
                </label>
                <input
                  type="password"
                  className={`form-control ${
                    validated && formData.confirmPasswordError
                      ? "is-invalid"
                      : ""
                  }`}
                  id="validationCustom05"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  autoComplete="Confirm password"
                />
                <div className="invalid-feedback">
                  {formData.confirmPasswordError}
                </div>
              </div>
            </div>
            <div className="row g-3">
              <div className="p-3 col-12">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className={`custom-file-input ${
                    validated && !formData.selectedImage ? "is-invalid" : ""
                  }`}
                  required
                />
                {formData.selectedImage && (
                  <div>
                    <h3>Selected Image:</h3>
                    <img
                      src={formData.selectedImage}
                      alt="Selected"
                      style={{ maxWidth: "200px" }}
                    />
                  </div>
                )}
                {validated && !formData.selectedImage && (
                  <span className="custom-file-input-error">
                    No file chosen
                  </span>
                )}
              </div>
            </div>
            <div className="px-2 col-12">
              <div className="form-check">
                <input
                  className={`form-check-input ${
                    validated && formData.agreeTermsError ? "is-invalid" : ""
                  }`}
                  type="checkbox"
                  id="invalidCheck"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  required
                />
                <label className="form-check-label" htmlFor="invalidCheck">
                  Agree to terms and conditions
                </label>
                <div className="invalid-feedback">
                  {formData.agreeTermsError}
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="text-center">
                <button
                  className="btn btn-success"
                  type="submit"
                  onClick={() => setFinalUser(setUser, formData)}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Registration;