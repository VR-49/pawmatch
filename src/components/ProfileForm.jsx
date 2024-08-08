import React from "react";

const ProfileForm = ({ profile, handleChange, handlePhotoChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input 
          type="text"
          name="firstName"
          value={profile.firstName}
          onChange={handleChange} 
        />
      </label>
      <label>
        <input 
          type="text"
          name="lastName"
          value={profile.LastName}
          onChange={handleChange} 
        />
      </label>
      <label>
        <input 
          type="text"
          name="location"
          value={profile.location}
          onChange={handleChange} 
        />
      </label>
      <label>
        <input 
          type="text"
          name="firstName"
          value={profile.firstName}
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