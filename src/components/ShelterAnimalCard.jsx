import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ShelterAnimalCard = () => {
  // pet data states
  const [petInfo, setPetInfo] = useState([]);
  const [petsArray, setPetsArray] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  // favorite states
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentFavorite, setCurrentFavorite] = useState();
  const [savedFavorites, setSavedFavorites] = useState([]);

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

  // like state clicker
  const handleLikeClick = () => {
    setIsFavorite((prev) => !prev);
    console.log('curr fav / index: ', activeIndex, '/', currentFavorite);
    saveFavorite(currentFavorite);
    storeFavArray();
    console.log('savedFavorites: ', savedFavorites);
  };
  // tracks current pet card to be favorited
  useEffect(() => {
    setCurrentFavorite(petInfo[activeIndex]);
  }, [petInfo, activeIndex]);

  // tracks savedFavorites ---> not working
  // useEffect(() => {
  //   setSavedFavorites(savedFavorites);
  // }, [savedFavorites]);

  // stores all favorites ---> not working
  const storeFavArray = () => {
    setSavedFavorites((prevFavorites) => {
      // Check if currentFavorite is already in prevFavorites
      const isFavorite = prevFavorites.includes(currentFavorite);

      if (isFavorite) {
        // Remove currentFavorite from prevFavorites
        return prevFavorites.filter((el) => el !== currentFavorite);
      } else {
        // Add currentFavorite to prevFavorites
        return [...prevFavorites, currentFavorite];
      }
    });
  };

  // posts the favorite pet to user array
  const saveFavorite = async (currentFavorite) => {
    try {
      console.log('saving favorite: ', currentFavorite);
      const response = await fetch(`/api/auth/favorite`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          favorite: currentFavorite,
          username: 'timhuman',
        }),
      });
    } catch (error) {
      console.error('Error savingFavorite: ', error);
    }
  };
  // deletes the favorite pet in the user array
  const removeFavorite = async (currentFavorite) => {
    try {
      console.log('delete favorite: ', currentFavorite);
      const response = await fetch(`/api/auth/deleteFavorite`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          favorite: currentFavorite,
          username: 'timhuman',
        }),
      });
    } catch (error) {
      console.error('Error in deleteFavorite: ', error);
    }
  };

  // liked state persists, need to reset it
  // also need to check if the pet already exists in the favorite list and persist the like

  // renders each ShelterAnimalCard based on the current activeIndex
  return (
    <div className='shelter-animal-card-container'>
      <h1>Shelter Animals</h1>
      {petsArray[activeIndex]}
      <button className='button' onClick={prevSlide}>
        Prev
      </button>
      <button className='button' onClick={nextSlide}>
        Next
      </button>
      <button className='button' onClick={handleLikeClick}>
        {isFavorite ? '🥰' : 'Like'}
      </button>
    </div>
  );
};
