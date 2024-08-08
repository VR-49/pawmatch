import React, { useState, useEffect } from 'react';

const AnimalCard = ({ animalId }) => {
  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
          throw new Error('Failed to fetch animal data');
        }
      } catch (error) {
        console.error('Error:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimalData();
  }, [animalId]);

  if (loading) return <p>Loading animal details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!animal) return <p>Animal data not available.</p>;

  return (
    <div className={styles.animalCard}>
      <img
        src={animal.image || 'default-image-url.jpg'}
        alt={`A ${animal.species || 'animal'}`}
        style={{ width: '100px', height: '100px' }}
      />
      <div class='animalDescription' >
      <h3>{animal.name || 'Unnamed'}</h3>
      <p>Species: {animal.species || 'Unknown'}</p>
      <p>Breed: {animal.breed || 'Unknown'}</p>
      <p>Age: {animal.age || 'Unknown'}</p>
      <p>{animal.description || 'No description available.'}</p>
      </div>
    </div>
  );
};

export default AnimalCard;
