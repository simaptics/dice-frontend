import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import { setupAxiosInterceptors } from './api';


const App: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setupAxiosInterceptors();
  }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default App;




