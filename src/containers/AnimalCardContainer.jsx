//component to hold animal cards display
import React, { useState, useEffect } from 'react';
import AnimalCard from '../components/AnimalCard';

//fetch shelter data, parse through pet ID property and pass ID down to AnimalCard

const AnimalCardContainer = () => {
  const [shelter, setShelter] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/shelter', {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          setShelter(data);
        } else {
          console.error('Error fetching data:', response.statusText);
        }
      } catch (error) {
        console.error('Error', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className='animal-card-container'>
      <h1>Scroll through All Available Animals</h1>
      {shelter.map((obj, index) => {
        //here we access the pet ID prop on shelter and pass it down to animalcard
        //might need to do another iteration to get individual IDs?
        return <AnimalCard />;
      })}
    </div>
  );
};

export default AnimalCardContainer;
