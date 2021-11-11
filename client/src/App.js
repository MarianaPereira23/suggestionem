/* eslint-disable no-unused-vars */
import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header/Header';
import HomeImage from './components/HomeImage/HomeImage';
import Form from './components/Form/Form';
import './App.css';

function App() {
  const navigate = useNavigate();

  return (
    <div className="app-container">
      <Header />
      <Routes>
        <Route path="/" element={<HomeImage />} />
        <Route path="/search" element={<Form />} />
        <Route path="/suggestions" element={<div>Results Page</div>} />
      </Routes>
    </div>
  );
}

export default App;
