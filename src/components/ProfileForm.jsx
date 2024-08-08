import React from "react";

const ProfileForm = ({ profile, handleChange, handlePhotoChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <label>
        First name:
        <input 
          type="text"
          name="firstName"
          value={profile.firstName}
          onChange={handleChange} 
        />
      </label>
      <label>
        Last name:
        <input 
          type="text"
          name="lastName"
          value={profile.LastName}
          onChange={handleChange} 
        />
      </label>
      <label>
        Location:
        <input 
          type="text"
          name="location"
          value={profile.location}
          onChange={handleChange} 
        />
      </label>
      <label>
        Bio:
        <input 
          type="text"
          name="bio"
          value={profile.bio}
          onChange={handleChange} 
        />
      </label>
      <label>
        <input 
          type="file"
          name="photo"
          onChange={handlePhotoChange} 
        />
      </label>
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default ProfileForm;