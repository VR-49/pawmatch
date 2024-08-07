import React from 'react';
import { useNavigate } from 'react-router-dom';
import ShelterAnimalCard from './ShelterAnimalCard';
//pass down props from fetched data in container
const ShelterCard = ({ id, username, location, orgName, bio, pets }) => {
  const navigate = useNavigate();
  // const handleView = async () => {
  //   try {
  //     const response = await fetch()
  //   }
  // }
  const handleView = () => {
    navigate('/shelter-animals', { state: { pets } });
  };

  return (
    <div className='shelter-card-container'>
      <h1>{orgName}</h1>
      <p>{username}</p>
      <p>{location}</p>
      <p>{bio}</p>
      {/* {pets.map(petId => {
        return <p key={petId}>{petId}</p>
      })} */}
      <button onClick={handleView} className='view-shelter-btn'>
        View Shelter
      </button>
    </div>
  );
};

export default ShelterCard;
