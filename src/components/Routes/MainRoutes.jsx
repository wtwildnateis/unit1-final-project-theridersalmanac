import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Home from '../../pages/home';
import Events from '../../pages/events';
import Resources from '../../pages/resources';
import Contact from '../../pages/contact';
import Footer from "../Footer/footer";
import { useEffect } from 'react';

const MainRoutes = () => {
    const location = useLocation();
    const fromTitle = location.state?.fromTitle;
    const isHome = location.pathname === "/home";

    useEffect(() => {
        if (fromTitle && isHome) {
            const timer = setTimeout(() => {
                window.history.replaceState({}, document.title);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [fromTitle, isHome]);


    const showNavbar = location.pathname !== "/";

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

                {showNavbar && (
                    < header className="navbarfade">
                        <Navbar />
                    </header>
                )}
                <main style={{ flex: 1 }}>
                    <section className="universalpagecontainer pagefadein" key={location.pathname}>
                        <Routes>
                            <Route
                                path="/home"
                                element={
                                    <div className={`fade-wrapper ${fromTitle ? "fade-in" : ""}`}>
                                        <Home />
                                    </div>
                                }
                            />

                            <Route path="/events" element={<Events />} />
                            <Route path="/resources" element={<Resources />} />
                            <Route path="/contact-us" element={<Contact />} />
                        </Routes>
                    </section>
                </main>
                <Footer />

            </div>

        </>
    );
};

export default MainRoutes;
