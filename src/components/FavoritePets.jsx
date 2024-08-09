import React, { useState, useEffect } from 'react';

const FavoritePets = () => {
    const [favPetArray, setFavPetArray] = useState([]); 
    //each favPetArray elem is obj {id, species, breed, name, gender, about, personality, picture}

    const getFavorites = async (favoriteIds) => {
        const fetchedPets = [];
        try{
        const res = await fetch('/api/auth/getFavorites') //which db do I fetch from? Account?
        const data = await res.json();
        console.log(data.favorites);
        fetchedPets.push(data.favorites);
        } catch (err) {
            console.log('Error fetching favorite pets ', err);
        }
        setFavPetArray(fetchedPets);
    };
    getFavorites();

    return (
        <div className='favorite-pet-'
    );

    // return(
    //     <div key={index} className='favorite-pet-card'>
    //         {/* <div className='fav-icon' >
    //             <button onClick={ handleUnfavorite } > Unfavorite </button>
    //         </div> */}
    //       <img
    //         src={getImgSrc(petObj.pet.picture)}
    //         alt={`Furry Friend ${petObj.pet.name}`}
    //       ></img>
    //       <div className='animal-description' >
    //       <p>Name: {petObj.pet.name || ''}</p>
    //       <p>Breed: {petObj.pet.breed || ''}</p>
    //       </div>
    //     </div>
    // );
};

export default FavoritePets;

/*  //favorite icon + state management

  const favClicked = (charId) => {
    const character = { ...this.props.characters[charId] };
    if (!character.fav) character.fav = true;
    else character.fav = false;
    this.props.updateCharacter(charId, character);
  }

*/






/*
//ANIMAL CARD FROM SHELTERANIMALCARD
        <div key={index} className='pet-card'>
          <img
            src={getImgSrc(petObj.pet.picture)}
            alt={`Furry Friend ${petObj.pet.name}`}
          ></img>
          <div className='animal-description' >
          <p>Name: {petObj.pet.name || ''}</p>
          <p>Species: {petObj.pet.species || ''}</p>
          <p>Breed: {petObj.pet.breed || ''}</p>
          <p>Personality: {petObj.pet.personality || ''}</p>
          <p>Stats: {petObj.pet.stats.age || ''}</p>
          </div>
        </div>

*/