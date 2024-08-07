import React, { useState, useEffect } from 'react';
import ShelterAnimalCard from '../components/ShelterAnimalCard';

const ShelterContainer = () => {
  const [shelterData, setShelterData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('/api/shelter/', {
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       });
  //       if (response.ok) {
  //         const data = await response.json();
  //         console.log('setShelterData: ', data);
  //         setShelterData(data);
  //       } else {
  //         console.error('Error fetching data:', response.statusText);
  //       }
  //     } catch (error) {
  //       console.error('Error', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, []);

  if (loading) {
    return <p>Loading shelter data...</p>;
  }
  if (shelterData.length === 0) return <p>No data available</p>;

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className='main-shelter-container'>
      <h1>Your Animals</h1>
      {shelterData.map((obj, index) => {
        // whatever our data
        //pass down data as props to shelter animal card
        <ShelterAnimalCard key={animal.id} animal={animal} />;
      })}
      <button onClick={handleAddAnimal} className='add-animal-button'>
        Add Animal
      </button>
    </div>
  );
};

export default ShelterContainer;

// return (
//   <div className="main-shelter-container">
//       <button onClick={handleAddAnimal} className="add-animal-button">Add Animal</button>
//       {shelterData.length ? (
//           shelterData.map(animal => (
//               <ShelterAnimalCard key={animal.id} animal={animal} />
//           ))
//       ) : (
//           <p>No animals found.</p>
//       )}
//   </div>
// );
// }
