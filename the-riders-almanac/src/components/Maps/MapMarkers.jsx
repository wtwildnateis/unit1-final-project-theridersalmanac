import { useState } from 'react';
import MapComponent from './Map';

const intialMarkers = [
    { type: "Bike Shop", name: "Downtown Bikes", position: { lat: 38.627, lng: -90.2 } },
    { type: "Bike Trail", name: "Forest Park Trail", position: { lat: 38.64, lng: -90.28 } },
    { type: "Skatepark", name: "Ramp Riders", position: { lat: 38.61, lng: -90.21 } },
    { type: "Mountain Bike Trail", name: "Castlewood MTB", position: { lat: 38.52, lng: -90.59 } },
];

const MapMarkers = () => {
    const [selectedType, setSelectedType] = useState("All");

    return (
        <div>
            <div className="filter-buttons">
                {["All", "Bike Shop", "Bike Trail", "Skatepark", "Mountain Bike Trail"].map((type) => (
                    <button key={type} onClick={() => setSelectedType(type)}>
                        {type}
                    </button>
                ))}
            </div>
            <MapComponent markers={intialMarkers} selectedType={selectedType} />
        </div>
    );
};

export default MapMarkers;