import { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import '../index.css';

function Title() {
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowContent(true);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="title-page">
            <img src={logo} className="title-logo fade-in-logo" alt="logo" />

        </div >
    );
};



export default Title;