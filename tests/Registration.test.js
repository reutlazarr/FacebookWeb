import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Registration from '../src/screens/Registration';

// Mock saveUserData function
jest.mock('./utils/Utils', () => ({
  saveUserData: jest.fn(),
}));

// Mock useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // Use actual for all non-hook parts
  useNavigate: () => jest.fn(), // Mock useNavigate
}));

describe('Registration Component', () => {
  test('fills and submits the registration form without the file input', async () => {
    const setUserMock = jest.fn();
    render(
      <BrowserRouter>
        <Registration setUser={setUserMock} />
      </BrowserRouter>
    );

    // Fill out the form
    await userEvent.type(screen.getByPlaceholderText('First name'), 'John');
    await userEvent.type(screen.getByPlaceholderText('Last name'), 'Doe');
    await userEvent.type(screen.getByPlaceholderText('Email address'), 'john.doe@example.com');
    await userEvent.type(screen.getByPlaceholderText('Password'), 'Password123!');
    await userEvent.type(screen.getByPlaceholderText('Confirm password'), 'Password123!');
    await userEvent.click(screen.getByLabelText('Agree to terms and conditions'));

    // Submit the form
    await userEvent.click(screen.getByRole('button', { name: 'Sign Up' }));

    // Check if setUser was called correctly (adjust according to your implementation)
// Adjust the expectation to reflect the actual outcome of the test
    expect(setUserMock).toHaveBeenCalledWith({
      name: 'John Doe',
      image: null, // Adjusted to expect null, aligning with the test setup
    });


    // Add any additional assertions here
  });
});
