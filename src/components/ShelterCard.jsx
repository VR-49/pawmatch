import React from "react";
//pass down props from fetched data in container
const ShelterCard = ({ id, username, location, orgName, bio, pets }) => {
  return (
      <div className="shelter-card-container">
      <h1>{orgName}</h1>
      <p>{username}</p>
      <p>{location}</p>
      <p>{bio}</p>
      {pets.map(petId => {
        return <p key={petId}>{petId}</p>
      })}
      <button className="view-shelter-btn">View Shelter</button>
    </div>
  ) 
}

export default ShelterCard;