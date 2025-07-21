import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import TitleToHomeSlider from './components/TitlePageSlider/TitleToHomeSlider';
import RoutesWrapper from './components/Routes/routeswrapper';

function AppRoutes() {
  const location = useLocation();

  return (
    <Routes>
      <Route path="/" element={<TitleToHomeSlider />} />
      <Route path="*" element={<RoutesWrapper />} />
    </Routes>
  );
}

function App() {

  return (
    <>
      <Router>
        <AppRoutes />
      </Router>
    </>
  );
}

export default App;
