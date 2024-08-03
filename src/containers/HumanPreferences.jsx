import React, {useState, useEffect} from "react"

function HumanPreferences (props) {
    const [preferences, setPrefernces] = useState({
        id: '',
        location: '',
        preferences: {},
        radius: '',
        bio: '',
        picture: '',
        starredPets: []
    });
    const [isTrackingAllowed, setIsTrackingAllowed] = useState(false);

    useEffect(() => {
        fetchPreferences();
    }, []);
    
    const fetchPreferences = async () => {
        const data = await fetch('/api/preferences').then(res => res.json());
    }



};

export default HumanPreferences;