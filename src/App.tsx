import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import { setupAxiosInterceptors } from './api';
import { BASENAME } from './config/router'



const App: React.FC = () => {
  const navigate = useNavigate();
    
  useEffect(() => {
      setupAxiosInterceptors(navigate);
    }, [navigate]);
  
    return (
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    );
};

const AppWithRouter: React.FC = () => (
  <Router basename={BASENAME}>
    <App />
  </Router>
);

export default AppWithRouter;
