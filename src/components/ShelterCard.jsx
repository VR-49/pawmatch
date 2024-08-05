import React from "react";
//pass down props from fetched data in container
const ShelterCard = ({ id, username, location, orgName, bio }) => {
  return (
    <div className="shelter-card-container">
      <p>{username}</p>
      <p>{location}</p>
      <p>{orgName}</p>
      <p>{bio}</p>
    </div>
  ) 
}

export default ShelterCard;