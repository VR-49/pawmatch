import React, { useState, useEffect } from 'react';
import ShelterCard from '../components/ShelterCard';

function HumanContainer() {
  // shelter data state management
  const [shelterData, setShelterData] = useState([]);

  // loading & error state management
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // fetches shelter data from database and
  // setting the state of shelterData to the fetched data
  useEffect(() => {
    const fetchHumanData = async () => {
      try {
        const response = await fetch('/api/shelter');
        const data = await response.json();
        setShelterData(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
        console.error(err);
      }
    };
    fetchHumanData();
  }, []);

  console.log('shelterData: ', shelterData);

  // loading & error display logic
  if (loading) return <p>Loading human data...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className='main-human-container'>
      {shelterData.map((shelter, index) => {
        // maps the shelter data into corresponding key value pairs
        const keys = Object.keys(shelter);
        const id = shelter[keys[0]];
        const username = shelter[keys[1]];
        const location = shelter[keys[2]];
        const orgName = shelter[keys[3]];
        const bio = shelter[keys[4]];
        const petIds = shelter[keys[5]];

        return (
          <ShelterCard
            key={index}
            id={id}
            username={username}
            location={location}
            orgName={orgName}
            bio={bio}
            petIds={petIds}
          />
        );
      })}
    </div>
  );
}

export default HumanContainer;
