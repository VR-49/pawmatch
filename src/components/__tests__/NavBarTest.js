import React from "react";
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import NavBar from '../NavBar';
import '@testing-library/jest-dom';

describe('NavBar Component', () => {
  
  // Render the NavBar compoenent before each test
  beforeEach(() => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );
  });

  it('The NavBar should render with the home link', () => {
    // Create variable for link based on name
    const homeLink = screen.getByRole('link', { name: 'Home' });
    // Check that link is in DOM 
    expect(homeLink).toBeInTheDocument();
    // Check that the link has the attributes that indicate it's a link for the correct endpoint
    expect(homeLink).toHaveAttribute('href', '/home');
  });

  it('The NavBar should render with the logout link', () => {
    const logoutLink = screen.getByRole('link', { name: 'Logout' });
    expect(logoutLink).toBeInTheDocument();
    expect(logoutLink).toHaveAttribute('href', '/logout');
  });

  it('The NavBar should render with the signup link', () => {
    const signupLink = screen.getByRole('link', { name: 'Signup' });
    expect(signupLink).toBeInTheDocument();
    expect(signupLink).toHaveAttribute('href', '/signup');
  });

  it('The NavBar should render with the login link', () => {
    const loginLink = screen.getByRole('link', { name: 'Login' });
    expect(loginLink).toBeInTheDocument();
    expect(loginLink).toHaveAttribute('href', '/login');
  });

});

