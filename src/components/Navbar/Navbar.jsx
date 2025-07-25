import './Navbar.css';
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import { Sling as Hamburger } from "hamburger-react";
import { useState, useRef, useEffect } from 'react';
const Navbar = () => {
    const [isNavOpen, setNavOpen] = useState(false);
    const mobileNavRef = useRef(null);

    useEffect(() => {
        const handleOffNavClick = (event) => {
            if (
                mobileNavRef.current &&
                !mobileNavRef.current.contains(event.target) &&
                isNavOpen
            ) {
                setNavOpen(false);
            }


        };

        document.addEventListener('mousedown', handleOffNavClick);
        return () => {
            document.removeEventListener('mousedown', handleOffNavClick);

        };
    }, [isNavOpen]);

    return (
        <>
            {/*navbar for tablets and mobiles*/}
            <nav className="navbar">
                <div className="navbar-container">

                    <div className="hamBurger">
                        <Hamburger toggled={isNavOpen} toggle={setNavOpen} size={24} color="white" />
                    </div>

                    <div className="navlogocontainer">
                        <NavLink to="/">
                            <img className="navlogo" src={logo} alt="Logo" />
                        </NavLink>
                    </div>

                    {/*my original desktop nav */}
                    <div className="navbar-links forDesktop">

                        <NavLink to="/home" className="navbuttonleft">

                            Home

                        </NavLink>
                        <NavLink to="/events" className="navbuttonleft">

                            Events

                        </NavLink>
                        <div className="spacebetween"></div>

                        <NavLink to="/resources" className="navbuttonright">

                            Resources

                        </NavLink>

                        <NavLink to="/contact-us" className="navbuttonright">

                            Contact Us

                        </NavLink>
                    </div>
                </div>

                <div ref={mobileNavRef}
                    className={`mobilenav ${isNavOpen ? "open" : ""}`}>
                    <NavLink to="/home" onClick={() => setNavOpen(false)}>Home</NavLink>
                    <NavLink to="/events" onClick={() => setNavOpen(false)}>Events</NavLink>
                    <NavLink to="/resources" onClick={() => setNavOpen(false)}>Resources</NavLink>
                    <NavLink to="/contact-us" onClick={() => setNavOpen(false)}>Contact</NavLink>
                </div>
            </nav>
        </>
    );
};

export default Navbar;