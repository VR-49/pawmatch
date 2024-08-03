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
  const [preferenceVisiblity, setPreferenceVisiblity] = useState(0)


	const handleChange = () => {
		setChecked(() => {
			if (!checked) return true
			else return false
		});
	}

  useEffect(()=>{
    const orgDOM = document.querySelector('.Org');
    const humanDOM = document.querySelector('.Human')
    if (preferenceVisiblity === 1) {
      orgDOM.style.display = ''
    }
    if (preferenceVisiblity === 2) {
      humanDOM.style.display = ''
    }
  },[preferenceVisiblity])

    const signUp = async (event) => {
      event.preventDefault();
      try {
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
          function displayChange() {
            if (!checked){
              setPreferenceVisiblity(1)
            } else {
              setPreferenceVisiblity(2)
            }
           
          }
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
          <button type='submit' className='signup'>Sign Up</button>
        </div>
        </form>
        
        <OrgPreferences className='afterCreate Org' username = '' style={{'display': 'none'}}/>
        <HumanPreferences className='afterCreate Human' username = '' style={{'display': 'none'}}/>
      </section>


    );
}

export default CreateAccount;