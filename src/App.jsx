import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Test from './pages/test-page';

export default function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    return () => {};
  }, [pathname]);

  useEffect(() => {
    if (window.history.action === 'POP') {
      window.addEventListener('unload', (e) => {
        return window.scrollTo(0, 0);
      });
    }

    if (window.history.scrollRestoration) {
      if (window.history.scrollRestoration === 'auto') {
        window.history.scrollRestoration = 'manual';
      }
      window.addEventListener('unload', () => {
        return window.scrollTo(0, 0);
      });
    }
    return () => {};
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Test />} />
    </Routes>
  );
}
