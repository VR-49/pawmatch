import React, { useState, useEffect } from 'react';
// import HumanCard from '../components/HumanCard'; //assume if we gonna have one
import ShelterCard from '../components/ShelterCard';

function HumanContainer() {
    const [shelterData, setShelterData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

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
    console.log(shelterData);
    const handleAddHuman = () => {
        console.log("Add human button clicked");
    };

    if (loading) return <p>Loading human data...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="main-human-container">
            {shelterData.map((obj, index) => {
              const keys = Object.keys(obj);
              const id = obj[keys[0]];
              const username = obj[keys[1]];
              const location = obj[keys[2]];
              const orgName = obj[keys[3]];
              const bio = obj[keys[4]];

              return <ShelterCard key={index} id={id} username={username} location={location} orgName={orgName} bio={bio}/>
            })}
            {/* {shelterData.length ? (
                shelterData.map(shelter => (
                    <HumanCard key={human.id} human={human} />
                ))
            ) : (
                <p>No humans found.</p>
            )} */}
        </div>
    );
}

export default HumanContainer;
