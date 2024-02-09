import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home-page';
import Theme from './pages/theme-page';
import './globals.css';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/theme" element={<Theme />} />
    </Routes>
  );
}
