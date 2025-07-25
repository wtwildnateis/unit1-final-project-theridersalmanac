import { useState } from "react";
import MapComponent from "./Map";

const MapWrapper = () => {
    const [selectedType, setSelectedType] = useState("Bike Shop");

    const categories = [
        "Bike Shop",
        "Bike Trail",
        "Skatepark",
        "Mountain Bike Trail",
    ];

    return (
        <>
            <div className="filter-buttons">
                {categories.map((type) => (
                    <button key={type} onClick={() => setSelectedType(type)}>
                        {type}
                    </button>
                ))}
            </div>
            <MapComponent selectedType={selectedType} />
        </>
    );
};

export default MapWrapper;