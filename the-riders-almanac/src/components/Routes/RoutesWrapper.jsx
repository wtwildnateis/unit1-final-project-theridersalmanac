import React from 'react';
import {
    BrowserRouter as Router, Routes, Route,
} from "react-router-dom";
import Navbar from '../Navbar/NavBar';
import Home from '../../pages/home';
import Events from '../../pages/events';
import Resources from '../../pages/resources';
import Contact from '../../pages/contact';
import Title from '../../pages/title';

const RoutesWrapper = () => {
    return (
        <>

            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Title />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/events" element={<Events />} />
                    <Route path="/resources" element={<Resources />} />
                    <Route path="/contact-us" element={<Contact />} />
                </Routes>
            </Router>

        </>
    );
};

export default RoutesWrapper;
