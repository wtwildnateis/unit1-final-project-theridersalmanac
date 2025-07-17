import React from "react";
import './Navbar.css';
import { NavLink } from "react-router-dom";
const Navbar = () => {
    return (
        <>
            <div className="nav-container">
                <div className="navbar">
                        <NavLink to="/home" className="navbutton">

                            Home

                        </NavLink>
                        <NavLink to="/events" className="navbutton">

                            Events

                        </NavLink>
                        <NavLink to="/resources" className="navbutton">

                            Resources

                        </NavLink>

                        <NavLink to="/contact-us" className="navbutton">

                            Contact Us

                        </NavLink>
                </div>
            </div>
        </>
    );
};

export default Navbar;