/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import HomeImage from './components/HomeImage/HomeImage';
import Form from './components/Form/Form';
import Suggestions from './components/Suggestions/Suggestions';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Header />
      <Routes>
        <Route path="/" element={<HomeImage />} />
        <Route path="/search" element={<Form />} />
        <Route path="/suggestions" element={<div>Empty Results Page</div>} />
        <Route path="/suggestions/:searchTerm" element={<><Form /><Suggestions /></>} />
      </Routes>
    </div>
  );
}

export default App;
