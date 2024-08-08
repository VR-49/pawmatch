import React from 'react';
import { useNavigate } from 'react-router-dom';

// deconstructed, mapped props from shelter data from HumanContainer
const ShelterCard = ({ id, username, location, orgName, bio, petIds }) => {
  const navigate = useNavigate();

  // navigates to new endpoint
  // passes the state of petIds when called by useLocation hook
  const handleView = () => {
    navigate('/shelter-animals', { state: { petIds } });
  };

  return (
    <div className='shelter-card-container'>
      <h1>{orgName}</h1>
      <p>{location}</p>
      <p>{bio}</p>
      <button onClick={handleView} className='view-shelter-btn'>
        View Shelter
      </button>
    </div>
  );
};

export default ShelterCard;
