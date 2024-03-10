import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../screens/Login'; // Adjust the import path as necessary
import * as Utils from '../utils/Utils';

// Mock navigate function
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useNavigate: () => jest.fn(),
}));

// Mock the validateUserData and validateUserEmail functions
jest.spyOn(Utils, 'validateUserData').mockReturnValue(true);
jest.spyOn(Utils, 'validateUserEmail').mockReturnValue(true);
jest.spyOn(Utils, 'getUser').mockReturnValue({ id: 'user123', email: 'user@example.com' });

describe('Login Component', () => {
  test('submits correct form data', async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // Find the email and password input fields
    const emailInput = screen.getByPlaceholderText('name@example.com');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByRole('button', { name: 'Log in' });

    // Simulate user typing
    await userEvent.type(emailInput, 'user@example.com');
    await userEvent.type(passwordInput, 'password123');

    // Simulate form submission
    fireEvent.click(screen.getByText('Log in'));

    // Assertions
    expect(Utils.validateUserData).toHaveBeenCalledWith('user@example.com', 'password123');
    expect(Utils.validateUserEmail).toHaveBeenCalledWith('user@example.com');
    // Here you might want to check if navigate was called if your logic depends on it
    // For example: expect(mockNavigate).toHaveBeenCalledWith('/signIn', expect.anything());
  });
});
