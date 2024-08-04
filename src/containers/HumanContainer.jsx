import React, { useState, useEffect } from 'react';
// import HumanCard from '../components/HumanCard'; //assume if we gonna have one

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
            <button onClick={handleAddHuman} className="add-human-button">Add Human</button>
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
