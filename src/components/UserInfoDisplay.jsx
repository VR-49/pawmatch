import React from "react";

const UserInfoDisplay = ({ profile }) => {
  return (
    <div className="user-info">
      <h1>User Info</h1>
      <p>First Name: {profile.firstName}</p>
      <p>Last Name: {profile.lastName}</p>
      <p>Location: {profile.location}</p>
      <p>Bio: {profile.bio}</p>
      {/* Render the photo if the profile.photo exists */}
      {profile.photo && (
        <div>Photo:
          <img src={`/api/images/${profile.photo}`} alt="User profile" />
        </div>
      )}
    </div>
  );
};

export default UserInfoDisplay;