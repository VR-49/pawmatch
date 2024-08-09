import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProfileForm from '../components/ProfileForm';
import UserInfoDisplay from '../components/UserInfoDisplay';

const ProfileContainer = () => {
  // Get the current location
  const location = useLocation();
  // Assign navigate to a variable for future use
  const navigate = useNavigate();
  // Extract username from the current locations state
  const { username } = location.state || {};

  // If the username does not exist redirect to login
  useEffect(() => {
    if (!username) {
      navigate('/login');
    }
  }, [username, navigate]);

  // Default state for form inputs
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    location: '',
    bio: '',
    photo: '',
  });

  // Default state for user display
  const [displayProfile, setDisplayProfile] = useState({
    firstName: '',
    lastName: '',
    location: '',
    bio: '',
    photo: '',
  });

  // Fetch the profile data based off of the username
  useEffect(() => {
    if (username) {
      const fetchProfile = async () => {
        const response = await fetch(`/api/profile/profile?username=${username}`);
        const data = await response.json();
        setDisplayProfile(data);
      };
      fetchProfile();
    }
  }, [username]);

  // Handle changes to any of the form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  // Handle changes to the photo input
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setProfile((prevProfile) => ({
      ...prevProfile,
      photo: file,
    }));
  };

  // Create a new FormData object and append the submitted values to it
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('firstName', profile.firstName);
    formData.append('lastName', profile.lastName);
    formData.append('location', profile.location);
    formData.append('bio', profile.bio);
    formData.append('photo', profile.photo);

    // Send the PUT request with the formData to the associated username
    const response = await fetch(`/api/profile/profile?username=${username}`, {
      method: 'PUT',
      body: formData,
    });

    if (response.ok) {
      const updatedProfile = await response.json();
      // If we get a truthy response status set the forms to default
      setProfile({
        firstName: '',
        lastName: '',
        location: '',
        bio: '',
        photo: '',
      });
      // Pass the updated profile data into our display
      setDisplayProfile(updatedProfile); 
      console.log('Profile updated successfully');
    } else {
      console.log('Failed to update profile')
    }
  };

  // Render the components passing in require pieces of state
  return (
    <div>
      <UserInfoDisplay profile={displayProfile} />
      <h1>Update Profile</h1>
      <ProfileForm 
        profile={profile}
        handleChange={handleChange}
        handlePhotoChange={handlePhotoChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default ProfileContainer;