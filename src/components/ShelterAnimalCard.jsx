import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ShelterAnimalCard = () => {
  const [petInfo, setPetInfo] = useState([]);
  const [petsArray, setPetsArray] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // hook to grab state from ShelterCard useNavigate
  const location = useLocation();
  const { petIds } = location.state;

  // image source handling for ShelterAnimalCards
  const srcIsExternal = (src) => src.slice(0, 4) === 'http'; // online source
  const srcIsMailto = (src) => src.slice(0, 6) === 'mailto'; // local source

  const getImgSrc = (src) =>
    srcIsExternal(src) || srcIsMailto(src)
      ? src
      : require(`../../server/models/images/${src}`).default;

  // image carousel handling
  const nextSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === petsArray.length - 1 ? 0 : prevIndex + 1
    );
  };
  const prevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? petsArray.length - 1 : prevIndex - 1
    );
  };

  // helper function to fetch pet data associated with petIds
  const getPets = async (petIds) => {
    const fetchedPets = [];
    for (let pet of petIds) {
      try {
        const response = await fetch(`/api/pet/${pet}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          fetchedPets.push(data);
        } else {
          console.error('Error fetching', response.statusText);
        }
      } catch (error) {
        console.error('Error', error);
      }
    }
    console.log('fetchedPets: ', fetchedPets);
    setPetInfo(fetchedPets);
  };

  // sets the fetchedPets array as the new petInfo state
  useEffect(() => {
    getPets(petIds);
  }, [petIds]);

  // maps the key-values from each pet to prepare for rendering
  // setting the petsArray to the evaluated result
  useEffect(() => {
    setPetsArray(
      petInfo.map((petObj, index) => (
        <div key={index} className='pet-card'>
          <img
            src={getImgSrc(petObj.pet.picture)}
            alt={`Furry Friend ${petObj.pet.name}`}
          ></img>
          <p>Name: {petObj.pet.name || ''}</p>
          <p>Species: {petObj.pet.species || ''}</p>
          <p>Breed: {petObj.pet.breed || ''}</p>
          <p>Personality: {petObj.pet.personality || ''}</p>
          <p>Stats: {petObj.pet.stats.age || ''}</p>
        </div>
      ))
    );
  }, [petInfo]);

  // renders each ShelterAnimalCard based on the current activeIndex
  return (
    <div className='shelter-animal-card-container'>
      <h1>Shelter Animals</h1>
      <button className='button' onClick={prevSlide}>
        Prev
      </button>
      {petsArray[activeIndex]}
      <button className='button' onClick={nextSlide}>
        Next
      </button>
    </div>
  );
};

export default ShelterAnimalCard;
