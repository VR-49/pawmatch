import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = ({ username }) => {
  const navigate = useNavigate();

  console.log('NavBar username:', username);

  return (
    <nav className="nav">
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/logout">Logout</Link>
        </li>
        <li>
          <Link to="/signup">Signup</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        {username && (
          <li>
            <Link to="/profile" state={{ username }}>Profile</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
