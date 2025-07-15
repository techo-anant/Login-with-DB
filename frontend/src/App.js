import React from 'react';
import './App.css';
import Login from './Login.js'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './Signup.js';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
   </div>
  );
}

export default App;
