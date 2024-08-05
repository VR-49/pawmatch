//component to view all animals from a shelter (this is for human side not org)
import React, { useState, useEffect } from "react";
import styles from './card.css';

const AnimalCard = ({ animalId }) => {
  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnimalData = async () => {
      try {
        const response = await fetch(`/api/animals/${animalId}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setAnimal(data);
        } else {
          console.error('Error fetching animal data:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    if (animalId) {
      fetchAnimalData();
    }
  }, [animalId]);
// checks if the animal object is available before rendering its details.

  if (loading) {
    return <p>Loading animal details...</p>;
  }

  if (!animal) {
    return <p>Animal data not available.</p>;
  }

  return (
    <div className="animal-card">
      <img
        src={animal.image || 'default-image-url.jpg'}
        alt={`A ${animal.species || 'animal'}`}
        style={{ width: '100px', height: '100px' }}
      />
      <h3>{animal.name || 'Unnamed'}</h3>
      <p>Species: {animal.species || 'Unknown'}</p>
      <p>Breed: {animal.breed || 'Unknown'}</p>
      <p>Age: {animal.age || 'Unknown'}</p>
      <p>{animal.description || 'No description available.'}</p>
    </div>
  );
};

export default AnimalCard;


//need to fetch data based on animal IDs that we got from AnimalCardContainer

// const AnimalCard = ({ animalId }) => {
//   return (
//     <div className="animal-card">
//       {/* this is where we add all the animal properties */}
//     </div>
//   )
// }
