import React, { useState, useEffect } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import '../styles/style.css';
import OrgPreferences from './OrgPreferences';
import HumanPreferences from './HumanPreferences';

const CreateAccount = () => {

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [pwd, setPwd] = useState('');
  const [repeatPwd, setRepeatPwd] = useState('');
  const [checked, setChecked] = useState(false);
  const [preferenceVisibility, setPreferenceVisibility] = useState(false)
  const [signedUp, setSignUp] = useState();
  const navigate = useNavigate();

	const handleChange = () => {
		setChecked(() => {
			if (!checked) return true
			else return false
		});
	}

    const signUp = async (event) => {
      event.preventDefault();    
        // if (checked) setPreferenceVisibility(true);
        try{
          const response = await fetch("/api/auth/signup", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
              username: username,
              password: pwd,
              email: email,
              isOrg: checked,
            })
          })
          .catch(err => {
            setSignUp('Signup Network Error. Please try again later'); 
          });
          //console.log('in create account response', response);
          if (response.ok) {         
            //const data = response;
            //console.log('Successful POST', data);
            navigate('/human-dashboard');
          }
          else{
            const reply = await response.json();
            console.log(reply.err);
            setSignUp(reply.err);
          }
        }
        catch (err) {
          setSignUp('Unknown error has occured' + err);
        }
    };

    return (
      <div className="signup-container">
          <form className="form" onSubmit={signUp}>
              <h2 className="form-title">Sign Up 🐾</h2>
              {signedUp && (
                <p>{signedUp}</p>
              )}
              <label className="label" htmlFor="email">Email:</label>
              <input className="input" type="email" id="email" required onChange={e => setEmail(e.target.value)} />
  
              <label className="label" htmlFor="username">Username:</label>
              <input className="input" type="text" id="username" required onChange={e => setUsername(e.target.value)} />
  
              <label className="label" htmlFor="password">Password:</label>
              <input className="input" type="password" id="password" required onChange={e => setPwd(e.target.value)} />
  
              <label className="label" htmlFor="org-check">Are you an organization?</label>
              <input type="checkbox" id="org-check" onChange={handleChange} />
  
              <button type="submit" className="button">Sign Up</button>
          </form>
  
          {/* {preferenceVisibility && signedUp && (
              <OrgPreferences className='afterCreate Org' username={username} />
          )}
          {!preferenceVisibility && signedUp && (
              <HumanPreferences className='afterCreate Human' username={username} />
          )} */}
      </div>
  );
}

export default CreateAccount;