import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProfileForm from '../components/ProfileForm';

const ProfileContainer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { username } = location.state || {};

  useEffect(() => {
    if (!username) {
      navigate('/login');
    }
  }, [username, navigate]);

  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    location: '',
    bio: '',
    photo: '',
  });

  useEffect(() => {
    if (username) {
      const fetchProfile = async () => {
        const response = await fetch(`/api/profile/profile?username=${username}`);
        const data = await response.json();
        setProfile(data);
      };
      fetchProfile();
    }
  }, [username]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setProfile((prevProfile) => ({
      ...prevProfile,
      photo: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('firstName', profile.firstName);
    formData.append('lastName', profile.lastName);
    formData.append('location', profile.location);
    formData.append('bio', profile.bio);
    formData.append('photo', profile.photo);


    const response = await fetch(`/api/profile/profile?username=${username}`, {
      method: 'PUT',
      body: formData,
    });

    if (response.ok) {
      console.log('Profile updated successfully');
    } else {
      console.log('Failed to update profile')
    }
  };

if (!username) {
  return <div>Loading...</div>;
}

  return (
    <div>
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