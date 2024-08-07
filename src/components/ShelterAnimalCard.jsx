import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// helper functions
const srcIsExternal = (src) => src.slice(0, 4) === 'http';
const srcIsMailto = (src) => src.slice(0, 6) === 'mailto';
// if img is src locally (not hosted online),
// src will be the required in image file
// otherwise, just src will be the url
const getImgSrc = (src) =>
  srcIsExternal(src) || srcIsMailto(src)
    ? src
    : require(`../../server/models/images/${src}`).default;

const ShelterAnimalCard = () => {
  const [petInfo, setPetInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [petsArray, setPetsArray] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  //carousel
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

  const location = useLocation();
  const { pets } = location.state;

  const getPets = async (pets) => {
    console.log('pets: ', pets);
    const fetchedPets = [];
    for (let petId of pets) {
      try {
        const response = await fetch(`/api/pet/${petId}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          fetchedPets.push(data);
          // setPetInfo(prevPetInfo => [...prevPetInfo, data]);
        } else {
          console.error('Error fetching', response.statusText);
        }
      } catch (error) {
        console.error('Error', error);
      }
    }
    setPetInfo(fetchedPets);
    setLoading(false);
  };
  // what does this do?
  useEffect(() => {
    getPets(pets);
  }, [pets]);

  //makes the animal cards
  useEffect(() => {
    setPetsArray(
      petInfo.map((obj, index) => (
        <div key={index} className='pet-card'>
          {/* add image resolve its path*/}
          <img
            src={getImgSrc(obj.pet.picture)}
            alt={`Furry Friend ${obj.pet.name}`}
          ></img>
          <p>Stats: {obj.pet.stats.age || ''}</p>
          <p>ID: {obj.pet._id || ''}</p>
          <p>Species: {obj.pet.species || ''}</p>
          <p>Name: {obj.pet.name || ''}</p>
          <p>Breed: {obj.pet.breed || ''}</p>
          <p>Personality: {obj.pet.personality || ''}</p>
        </div>
      ))
    );
  }, [petInfo]);
  // if (loading) {
  //   return <p>Loading...</p>;
  // }
  console.log(petInfo);
  petInfo.map((obj, index) => {
    const keys = Object.keys(obj);
    console.log('keys', keys);
    console.log('obj,', obj);
    console.log('index', index);
  });
  return (
    <div className='shelter-animal-card-container'>
      <h1>Shelter Animals</h1>

      {/* {petInfo[0].map((obj, index) => (
        <div>
        <p>Stats: {obj.stats.age}</p>
        <p>ID: {obj.id || ""}</p>
        </div>
      ))} */}
      <button className='button' onClick={prevSlide}>
        Prev
      </button>
      {petsArray[activeIndex]}
      <button className='button' onClick={nextSlide}>
        Next!!
      </button>
    </div>
  );
};

export default ShelterAnimalCard;
