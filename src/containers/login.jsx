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
      const humanResponse = await fetch(`/api/human/login?username=${username}`, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      if (humanResponse.ok) {
        const humanResult = await humanResponse.json();
        setHumanUserData(humanResult);
        console.log(humanUserData);
        navigate('/human-dashboard');
      } else if (humanResponse.status === 400) {
        const orgResponse = await fetch(`/api/shelter/login?username=${username}`, {
          headers: {
            'Content-Type': 'application/json',
          }
        })
        if (orgResponse.ok) {
          const orgResult = await orgResponse.json();
          setOrgUserData(orgResult);
          console.log(orgUserData);
          navigate('/org-dashboard');
      }
        else {
        throw new Error('Error fetching data from human')
      }
      }
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="login-container">
        <h1>PawMatch</h1>
        <h4>login</h4>
        <form onSubmit={handleSubmit}>
        <div>
          <label>
              Username: 
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
          </label>
        </div>  
        <div>
            <label>
                Password: 
                <input 
                type='password'
                value = {password}
                onChange={e => setPassword(e.target.value)}>
                </input>
            </label>
            </div>
            <button type='submit'>Login</button>
        </form>
        {/* <span><a href='/createAccount'>Create an account.</a></span> */}
    </div>
    {/* {isHuman && (
      <HumanContainer />
    )} */}
    </>
  )
}

export default LoginContainer;