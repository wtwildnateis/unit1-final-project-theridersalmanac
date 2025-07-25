import { useState, useCallback, useEffect, useRef } from "react";
import {
    GoogleMap,
    useLoadScript,
    Marker,
} from "@react-google-maps/api";

const libraries = ["places"];
const mapContainerStyle = {
    width: "100%",
    height: "600px",
};

const MapComponent = ({ selectedType }) => {
    const [markers, setMarkers] = useState([]);
    const [center, setCenter] = useState({ lat: 38.6270, lng: -90.1994 });
    const mapRef = useRef(null);

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        libraries,
    });
    console.log("Loaded key:", import.meta.env.VITE_GOOGLE_MAPS_API_KEY);


    const onMapLoad = useCallback((map) => {
        mapRef.current = map;

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const userLoc = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                setCenter(userLoc);
                map.panTo(userLoc);
            });
        }
    }, []);

    useEffect(() => {
        if (!mapRef.current || selectedType === "All") return;

        const service = new window.google.maps.places.PlacesService(mapRef.current);
        const request = {
            location: center,
            radius: 10000, // this is meters
            keyword: selectedType.toLowerCase(),
        };

        service.nearbySearch(request, (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                const newMarkers = results.map((place) => ({
                    position: {
                        lat: place.geometry.location.lat(),
                        lng: place.geometry.location.lng(),
                    },
                    name: place.name,
                }));
                setMarkers(newMarkers);
            } else {
                console.error("PlacesService error:", status);
                setMarkers([]);
            }
        });
    }, [selectedType, center]);


    if (loadError) return <div className="map-error">Error loading map</div>
    if (!isLoaded) return <div className="map-loading">Loading map...</div>

    return (
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={13}
            center={center}
            onLoad={onMapLoad}
        >
            {markers.map((marker, idx) => (
                <Marker key={idx} position={marker.position} title={marker.name} />
            ))}
        </GoogleMap>
    );
};

export default MapComponent;