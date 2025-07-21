import { useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';

const Home = () => {
    const location = useLocation();
    const [fadeClass, setFadeClass] = useState("");

    useEffect(() => {
        if (location.state?.fromTitle) {
            setFadeClass("fade-in");
        }
    }, [location.state]);

    return (
        <>
            <div className={`universalpagecontainer ${fadeClass}`}>
                <div className="stepdown">
                    <p>Welcome, Riders!
                        Whether you're exploring a new city or hitting familiar paths, The Rider’s Almanac is your trusted companion for all things cycling. Our mission is simple: to empower riders with the resources, connections, and inspiration they need to make every ride smooth, exciting, and unforgettable.

                        Looking for upcoming bike events or local races? We’ve got that.
                        Need to find the closest bike-friendly café, shop, or trail system? We’ve mapped it out for you.
                        Just want to soak in the local ride culture? You’re in the right place.

                        Here, it’s not just about the destination—it’s about the ride.
                        So clip in, gear up, and let The Rider’s Almanac guide your next adventure.
                        Enjoy the ride.</p>
                </div>
            </div>

        </>
    );
};

export default Home;