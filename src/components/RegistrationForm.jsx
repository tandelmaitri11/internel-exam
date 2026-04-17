import React, { useState } from 'react';
import '../styles/RegistrationForm.css';

const RegistrationForm = ({ onRegistrationSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    subscriptionPlan: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    } else if (!/(?=.*[A-Za-z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain letters and numbers';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Subscription plan validation
    if (!formData.subscriptionPlan) {
      newErrors.subscriptionPlan = 'Please select a subscription plan';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      // Form is valid - proceed with registration
      const registrationData = {
        ...formData,
        registeredAt: new Date().toISOString(),
        id: Math.random().toString(36).substr(2, 9)
      };

      // Log the registration
      console.log('User registered:', registrationData);

      // Call the success callback if provided
      if (onRegistrationSuccess) {
        onRegistrationSuccess(registrationData);
      }

      // Show success message
      setSuccessMessage(`Welcome ${formData.name}! Your registration was successful.`);
      setIsSubmitted(true);

      // Reset form
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      });

      // Clear success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setSuccessMessage('');
      }, 5000);
    } else {
      setErrors(validationErrors);
    }
  };

  const clearForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      subscriptionPlan: ''
    });
    setErrors({});
    setSuccessMessage('');
    setIsSubmitted(false);
  };

  return (
    <div className="registration-wrapper">
      <div className="registration-container">
        <h2>User Registration Form</h2>
        <p className="subtitle">Create your account for library push notifications</p>

        {isSubmitted && (
          <div className="success-message">
            ✓ {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="registration-form" noValidate>
          {/* Full Name Field */}
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={`form-input ${errors.name ? 'input-error' : ''}`}
            />
            {errors.name && (
              <span className="error-text">
                <i className="error-icon">!</i> {errors.name}
              </span>
            )}
          </div>

          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className={`form-input ${errors.email ? 'input-error' : ''}`}
            />
            {errors.email && (
              <span className="error-text">
                <i className="error-icon">!</i> {errors.email}
              </span>
            )}
          </div>

          {/* Subscription Plan Field */}
          <div className="form-group">
            <label htmlFor="subscriptionPlan">Subscription Plan *</label>
            <select
              id="subscriptionPlan"
              name="subscriptionPlan"
              value={formData.subscriptionPlan}
              onChange={handleChange}
              className={`form-input ${errors.subscriptionPlan ? 'input-error' : ''}`}
            >
              <option value="">Select a plan</option>
              <option value="basic">Basic Plan - $9.99/month</option>
              <option value="premium">Premium Plan - $19.99/month</option>
              <option value="enterprise">Enterprise Plan - $49.99/month</option>
              <option value="student">Student Plan - $4.99/month</option>
            </select>
            {errors.subscriptionPlan && (
              <span className="error-text">
                <i className="error-icon">!</i> {errors.subscriptionPlan}
              </span>
            )}
            <small className="plan-hint">
              Choose the plan that best fits your needs
            </small>
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label htmlFor="password">Password *</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Min 6 characters (letters & numbers)"
              className={`form-input ${errors.password ? 'input-error' : ''}`}
            />
            {errors.password && (
              <span className="error-text">
                <i className="error-icon">!</i> {errors.password}
              </span>
            )}
            <small className="password-hint">
              Password should contain letters and numbers
            </small>
          </div>

          {/* Confirm Password Field */}
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password *</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              className={`form-input ${errors.confirmPassword ? 'input-error' : ''}`}
            />
            {errors.confirmPassword && (
              <span className="error-text">
                <i className="error-icon">!</i> {errors.confirmPassword}
              </span>
            )}
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
            <button type="button" className="btn btn-secondary" onClick={clearForm}>
              Clear
            </button>
          </div>

          {/* Form Info */}
          <p className="form-info">
            * All fields are required
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
