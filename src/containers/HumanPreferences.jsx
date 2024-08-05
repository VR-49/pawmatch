import React, { useState } from 'react';
//  const { username, location, firstName, lastName, bio, picture } = req.body;

function HumanPreferences({ username }) {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: username,
        password: '',
        bio: '',
        location: '',
        // picture: ''
    });

    const [image, setImage] = useState('')
    const [error, setError] = useState('');

    const handleImage = (e) => {
        setImage(e.target.files[0])
    }

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const attachImg = new FormData()
        attachImg.append('picture', image);
        attachImg.append('firstName', formData.firstName);
        attachImg.append('lastName', formData.lastName);
        attachImg.append('username', formData.username);
        // don't need to pass password?
        attachImg.append('password', formData.password);
        attachImg.append('bio', formData.bio);
        attachImg.append('location', formData.location);
        console.log('attachImg', attachImg)

        try {
            const response = await fetch('/api/human/signup', {
                method: 'POST',
                body: attachImg,
            });
            if (!response.ok) throw new Error('Failed to sign up');
            const data = await response.json();
            console.log('Signup successful:', data);
            // Redirect or update UI after successful signup
        } catch (err) {
            setError(err.message);
            console.error('Error during signup:', err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
            {error && <p>Error: {error}</p>}
            {/* <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
            /> */}
            <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
            />
            <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
            />
            {/* <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
            /> */}
            <input
                type="text"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Bio"
            />
            <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Location"
            />
            <input
                type="text"
                name="radius"
                value={formData.radius}
                onChange={handleChange}
                placeholder="Preferred Radius"
            />
            <input
                type="file"
                name="picture"
                value={formData.picture}
                onChange={handleImage}
                placeholder="Profile Picture URL"
            />
            {/* <label>
                Are you signing up as an organization?
                <input
                    type="checkbox"
                    name="isOrg"
                    checked={formData.isOrg}
                    onChange={handleChange}
                />
            </label> */}
            <button type="submit">Sign Up</button>
        </form>
    );
}

export default HumanPreferences;
