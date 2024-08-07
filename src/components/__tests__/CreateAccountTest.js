import React from "react";
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import CreateAccount from "../../containers/CreateAccount";
import '@testing-library/jest-dom';

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
    // Simulate an event occuring for each user action  
    fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByLabelText('Username:'), { target: { value: 'Test' } });
    fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'testpassword' } });
    fireEvent.click(screen.getByLabelText('Are you an organization?'));

    // Confirm that each input value is correct
    expect(screen.getByLabelText('Email:')).toHaveValue('test@test.com');
    expect(screen.getByLabelText('Username:')).toHaveValue('Test');
    expect(screen.getByLabelText('Password:')).toHaveValue('testpassword');
    expect(screen.getByLabelText('Are you an organization?')).toBeChecked();
  });


});