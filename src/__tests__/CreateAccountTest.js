import React from "react";
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import CreateAccount from "../containers/CreateAccount";
import '@testing-library/jest-dom';

// Helper function to simulate all the possible user actions
const fillFormAndSubmit = () => {
  fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'test@test.com' } });
  fireEvent.change(screen.getByLabelText('Username:'), { target: { value: 'Test' } });
  fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'testpassword' } });
  fireEvent.click(screen.getByLabelText('Are you an organization?'));
  fireEvent.click(screen.getByRole('button', { name: 'Sign Up' }));
};

describe('CreateAccount Component', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <CreateAccount />
      </BrowserRouter>
    );
  });
  
  it('renders the form and inputs correctly', () => {
    // Check if the signup header text renders
    expect(screen.getByText('Sign Up 🐾')).toBeInTheDocument();

    // Check if each input text renders
    expect(screen.getByLabelText('Email:')).toBeInTheDocument();
    expect(screen.getByLabelText('Username:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
    expect(screen.getByLabelText('Are you an organization?')).toBeInTheDocument();

    // Check if the submit button text renders
    expect(screen.getByRole('button', { name: 'Sign Up' })).toBeInTheDocument();
  });

  it('handles input changes correctly', () => {
    // Simulate all user actions
    fillFormAndSubmit();

    // Confirm that each input value is correct
    expect(screen.getByLabelText('Email:')).toHaveValue('test@test.com');
    expect(screen.getByLabelText('Username:')).toHaveValue('Test');
    expect(screen.getByLabelText('Password:')).toHaveValue('testpassword');
    expect(screen.getByLabelText('Are you an organization?')).toBeChecked();
  });

  it('sends the POST request successfully', async () => {
    // Create a function that mocks fetch
    const mockFetch = jest.fn(() => 
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    );

    // Override the global fetch function so we don't unintentionally use it
    global.fetch = mockFetch;

    // Simulate an event occuring for each user action
    fillFormAndSubmit();

    // Check that the POST request is sent to the correct endpoint with the correct method, headers, and body
    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1));
    expect(mockFetch).toHaveBeenCalledWith('/api/auth/signup', expect.objectContaining({
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        username: 'Test',
        password: 'testpassword',
        email: 'test@test.com',
        isOrg: true,
      }),
    }));
  });
});