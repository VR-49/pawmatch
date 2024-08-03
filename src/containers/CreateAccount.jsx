import React, { useState, useEffect } from 'react';
import { redirect } from 'react-router-dom';

//import containers
import OrgPreferences from './OrgPreferences';
import HumanPreferences from './HumanPreferences';

const CreateAccount = () => {

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [pwd, setPwd] = useState('');
  const [repeatPwd, setRepeatPwd] = useState('');
  const [checked, setChecked] = useState(false);
  const [preferenceVisiblity, setPreferenceVisiblity] = useState(false)
  const [signedUp, setSignUp] = useState(false);


	const handleChange = () => {
		setChecked(() => {
			if (!checked) return true
			else return false
		});
	}

    const signUp = async (event) => {
      event.preventDefault();
      try {
        
        if (checked) setPreferenceVisiblity(true);
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
        });
        if (response.ok) {
          const data = await response.json();
          console.log('Successful POST', data);
        } else {
            console.log('error');
        }
      } catch (error) {
        console.error(error);
      }
    };

    return (
      <section>
        <form onSubmit={signUp}>
        <div className='createAccount'>
          <label>Email: </label> 
          <input type='email' size='30' required onChange={e => setEmail(e.target.value)}/>

          <label>Username: </label>
          <input type='text' name='username' required onChange={e => setUsername(e.target.value)}/>

          <label>Password: </label>
          <input type='password' name='password' minLength='8' required onChange={e => setPwd(e.target.value)}/>

          {/* <label for ='password-repeat'> Repeat Password</label>
          <input type='password' name='password-repeat' required onChange={e => setRepeatPwd(e.target.value)}/> */}

          <label> Are you an organization?</label>
          {/* not sure if you can uncheck need to test */}
          <input type='checkbox' name='account-type' onChange={handleChange}/>
          <button type='submit' onClick={() => setSignUp(true)} className='signup'>Sign Up</button>
        </div>
        </form>

        {preferenceVisiblity && signedUp && (
          <OrgPreferences className='afterCreate Org' username = {username} />
        )}
        {!preferenceVisiblity && signedUp && (
          <HumanPreferences className='afterCreate Human' username = {username}/>  
        )}
      </section>


    );
}

export default CreateAccount;