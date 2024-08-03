import React, {useState} from 'react';
import { redirect } from 'react-router-dom';


const createAccount = () => {

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [pwd, setPwd] = useState('');
  const [repeatPwd, setRepeatPwd] = useState('');
	const [checked, setChecked] = useState(false);


	const handleChange = () => {
		setChecked(!checked);
	}

	const checkRepeatPwd = (e) => {
		//check up to the length of repeatPwd input
		const comparePwd = pwd.substring(0, repeatPwd.length)
		if (comparePwd != repeatPwd) {
			//if password doesn't match span display
		} else {
			setRepeatPwd(e.target.repeatPwd)
		}
	};
  
const signUp = (email, username, pwd) => {
	fetch('/signup', {
		method: 'POST',
		headers: {
			'Content-type': 'application/json'
		},
		body: JSON.stringify({email, username, pwd, checked})
	})
	.then(res => {
		if (!res.ok) {
			throw new Error (`HTTP error. Status: ${res.status}`)
		}
		//resend the boolean for redirect
		return res.json() 
	})
	.then( res => {
			//switch to org signup
			!checked ? redirect('/signup/user') : redirect('/signup/org')
})
}

    return (
	  <form >
		<div className='createAccount'>
		  <label for='email'>Email: </label> 
		  <input type='email' pattern='.+@example\.com' size='30' required onChange={e => setEmail(e.target.email)}/>

		  <label for='username'>Username: </label>
		  <input type='text' name='username' required onChange={e => setUsername(e.target.username)}/>

		  <label for='password'>Password: </label>
		  <input type='password' name='password' minLength='8' required onChange={e => setPwd(e.target.pwd)}/>

		  <label for ='password-repeat'> Repeat Password</label>
		  <input type='password' name='password-repeat' required onChange={comparePwd}/>

			<label for='account-type'> Are you an organization?</label>
			{/* not sure if you can uncheck need to test */}
			<input type='checkbox' name='account-type' onChange={handleChange}/>
		  <button type='submit' class='signup' onSubmit={signUp(email, username, pwd, checked)}>Sign Up</button>
		</div>
	  </form>
    );
}

export default createAccount