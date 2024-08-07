import React from "react";
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import NavBar from '../NavBar';
import '@testing-library/jest-dom';

describe('NavBar Component', () => {
  it('The NavBar should render with the correct links',() => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );

    // Check if each link is rendered
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
    expect(screen.getByText('Signup')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });
});

