import './Navbar.css';
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";

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

                    <div className="navlogocontainer">
                        <NavLink to="/">
                            <img src={logo}></img>
                        </NavLink>
                    </div>
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