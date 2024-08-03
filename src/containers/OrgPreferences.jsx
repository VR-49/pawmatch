import React, { useState } from 'react';

const OrgPreferences = (props) => {
	const [address, setAddress] = useState('')
	const [bio, setBio] = useState('')
	const [name, setName] = useState('')
	const [image, setImage] = useState('')


//REQUEST BODY FORMAT :: const { username, location, orgName, bio,  picture } = req.body;

const orgUpdate = async () => {
		event.preventDefault();
		const body = {
			username: props.username,
			location: address,
			orgName: name,
			bio: bio,
			picture: image
		}
		try{
			const response = await fetch('/api/shelter/signup', {
				method: 'POST',
				headers: {
					'Content-type': 'application/json'
				},
				body: JSON.stringify({body})
			})
			if (response.ok) {
				const data = await data.json()
			}
			else {
				console.log('error in updating account data')
			}
		}
		catch (error){
			console.log(error)
		}	
	}


	return (
  <div>
		<form onSubmit={orgUpdate}>
			<h3>Welcome, ${props.username}!</h3>
			<label >Organization Name: </label>
			<input type='text' name='orgName' onChange={e => setUsername(e.target.value)}/>
			<label >Address</label>
			<input type='text' name='address' onChange={e => setUsername(e.target.value)}/>
			<label>Upload Image</label>
			<input type='file' name='file' onChange={e => setImage(e.target.value)}/>
			<label >About Organization</label>
			<textarea name='bio' rows={5} cols={70} onChange={setImage(e.target.files[0])}/>
		  <button type='submit'>Update About Organization</button>
		</form>
	</div>
	)
}

export default OrgPreferences;