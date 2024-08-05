import React, { useState } from 'react';
import axios from 'axios';

const OrgPreferences = (props) => {
	const [address, setAddress] = useState('')
	const [bio, setBio] = useState('')
	const [name, setName] = useState('')
	const [image, setImage] = useState('')

	//image/file handler
	function handleImage(e) {
		setImage(e.target.files[0])
	}

//REQUEST BODY FORMAT :: const { username, location, orgName, bio,  picture } = req.body;

const orgUpdate = (event) => {
		event.preventDefault();
		const formData = new FormData()
		formData.append('picture', image)
		formData.append('location', address)
		formData.append('orgName', name)
		formData.append('bio', bio)
		formData.append('username', props.username)

	axios.post('/api/shelter/signup', formData)
		.then(res => {
			console.log(res)
			console.log('res.data:', res.data)
		})

	// 	try{
	// 		const response = await fetch('/api/shelter/signup', {
	// 			method: 'POST',
	// 			headers: {
	// 				'Content-type': 'multipart/form-data'
	// 			},
	// 			body: JSON.stringify(formData)
	// 		})
	// 		if (response.ok) {
	// 			const data = await data.json()
	// 		}
	// 		else {
	// 			console.log('error in updating account data')
	// 		}
	// 	}
	// 	catch (error){
	// 		console.log(error)
	// 	}	
	}


	return (
  <div>
		<form onSubmit={orgUpdate}>
			<h3>Welcome, {props.username}!</h3>
			<label >Organization Name: </label>
			<input type='text' name='orgName' onChange={e => setName(e.target.value)}/>
			<label >Address</label>
			<input type='text' name='address' onChange={e => setAddress(e.target.value)}/>
			<label>Upload Image</label>
			<input type='file' name='file' onChange={handleImage}/>
			<label >About Organization</label>
			<textarea name='bio' rows={5} cols={70} onChange={e => setBio(e.target.value)}/>
		  <button type='submit'>Update About Organization</button>
		</form>
	</div>
	)
}

export default OrgPreferences;