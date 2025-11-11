import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import Home from './Components/Pages/Home';
import Blog from './Components/Pages/Blog';
import GameOfLife from './Components/Pages/GameOfLife';

const App = () => {
  return (
    <div className="App" style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar /> 
      <div
        className="content"
        style={{
          marginLeft: '250px',
          padding: '10px',
          flex: 1,
        }} /* Main content area with margin to avoid overlap with sidebar */
      >
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/Blog" element={<Blog />} />
          <Route path="/GameOfLife" element={<GameOfLife />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;