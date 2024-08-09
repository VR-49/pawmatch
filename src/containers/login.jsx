import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HumanContainer from './HumanContainer';

const LoginContainer = ({ setAppUsername, setAuth, auth }) => {
  const [humanUserData, setHumanUserData] = useState(null);
  //const [orgUserData, setOrgUserData] = useState(null);
  // const [isHuman, setIsHuman] = useState(false);
  // const [isOrg, setIsOrg] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginIssue, setLoginIssue] = useState('');
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
      setAuth('valid');
  }, [humanUserData]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log('Login submitted with:', username, password);
    try {
      const userResponse = fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      })
        .then((data) => data.json())
        .then((userResponse) => {
          console.log('checking userResponse', userResponse);
          if (userResponse.error) {
            console.log('incorrect user or password clientside');
            throw new Error('Error fetching data from human');
          }
          if (userResponse) {
            console.log('userresponse', userResponse);
            if (userResponse.state === 'authorized') {
              setAppUsername(userResponse.username);
              //console.log('ishuman');
              setHumanUserData('authorized');
              navigate('/human-dashboard');
            } 
            else if(userResponse === 'incorrect password'){
              setLoginIssue(userResponse);
            }
            else if(userResponse === 'Account not found'){
              setLoginIssue(userResponse);
            }
          }
        })
        .catch((err) => err);
    } catch (error) {
      console.error('Error:', error);
    } 

  };

  return (
    <div className='login-container'>
      <h1>PawMatch 🐾</h1>
      <h4>Login 🐶🐱</h4>
      {loginIssue && <p>{loginIssue}</p>}
      {auth === 'expired' && <p>Session Expired</p>}
      <form className='login-form' onSubmit={handleSubmit}>
        <div>
          <label>
            Username 🐱:
            <input
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Password 🐶:
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <button type='submit'>Login 🐾</button>
      </form>
    </div>
  );
};

export default LoginContainer;
