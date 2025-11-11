import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import Home from './Components/Pages/Home';
import Blog from './Components/Pages/Blog';
import Projects from './Components/Pages/Projects';
import GameOfLife from './Components/Pages/Projects/GameOfLife';
import Fractals from './Components/Pages/Projects/Fractals';

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
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Blog" element={<Blog />} />
          <Route path="/Projects" element={<Projects />} />
          <Route path="/Projects/GameOfLife" element={<GameOfLife />} />
          <Route path="/Projects/Fractals" element={<Fractals />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;