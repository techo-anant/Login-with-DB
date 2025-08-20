import React from 'react';
import './App.css';
import Login from './components/Login.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup.js';
import Success from './components/success.js';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </BrowserRouter>
   </div>
  );
}

export default App;
