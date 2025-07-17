import React from 'react';
import './App.css';
import './index.css';
import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router, Routes, Route,
} from "react-router-dom";
import Home from "./pages/home";
import Events from "./pages/events";
import Resources from "./pages/resources";
import Contact from "./pages/contact";
import Title from "./pages/title";

function App() {

  return (
    <>
      <div class="container">
        <div class="navbar">
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
        </div>
      </div>
    </>
  );
}

export default App
