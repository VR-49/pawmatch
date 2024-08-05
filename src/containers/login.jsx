import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import HumanContainer from "./HumanContainer";

const LoginContainer = () => {
  const [humanUserData, setHumanUserData] = useState(null);
  const [orgUserData, setOrgUserData] = useState(null);
  // const [isHuman, setIsHuman] = useState(false);
  // const [isOrg, setIsOrg] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Login submitted with:', username, password);
    try {
      // const humanResponse = await fetch(`/api/human/login?username=${username}`, {
      //   headers: {
      //     'Content-Type': 'application/json',
      //   }
      // })
      const userResponse = fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username, 
          password: password,
        })
      }).then(data => data.json())
      .then(userResponse => {
        // console.log(userResponse);
        // console.log('error:', userReponse.error);
        if (userResponse.error){
          console.log('incorrect user or password clientside');
          throw new Error('Error fetching data from human');
        }
        if (userResponse){
          console.log('userresponse', userResponse);
          if (userResponse.isOrg) {
            setOrgUserData(userResponse.shelter);
            navigate('/org-dashboard');
          }
          else {
            console.log('ishuman');
            setHumanUserData(userResponse.human);
            navigate('/human-dashboard');
          }
        }
      }).catch(err => err)
      // });
      // if (humanResponse.ok) {
      //   const humanResult = await humanResponse.json();
      //   setHumanUserData(humanResult);
      //   console.log(humanUserData);
      //   navigate('/human-dashboard');
      // } else if (humanResponse.status === 500) {
      //   const orgResponse = await fetch(`/api/shelter/login?username=${username}`, {
      //     headers: {
      //       'Content-Type': 'application/json',
      //     }
      //   })
      //   if (orgResponse.ok) {
      //     const orgResult = await orgResponse.json();
      //     setOrgUserData(orgResult);
      //     console.log(orgUserData);
      //     navigate('/org-dashboard');
      // }
      // if (userResponse.ok){
      //   console.log('userresponse', userReponse.user);
      //   if (userResponse.isOrg) {
      //     const humanResult = await userResponse.user.json();
      //     setHumanUserData(humanResult);
      //     navigate('/human-dashboard');
      //   }
      //   else {
      //     const orgResult = await userResponse.user.json();
      //     setOrgUserData(orgResult);
      //     navigate('/org-dashboard');
      //   }
      // }
      //   else {
      //   throw new Error('Error fetching data from human')
      // }
      }
      catch (error) {
      console.error('Error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h1>PawMatch 🐾</h1>
      <h4>Login 🐶🐱</h4>
      <form className="login-form" onSubmit={handleSubmit}>
        <div>
          <label>
            Username 🐱:
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Password 🐶:
            <input
              type='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </label>
        </div>
        <button type='submit'>Login 🐾</button>
      </form>
    </div>
  );
};

export default LoginContainer;