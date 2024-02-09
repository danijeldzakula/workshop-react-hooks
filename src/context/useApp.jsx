import { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { STORAGE_THEME, HAS_WINDOW } from '@/helpers/constant';
import useWindowDimensions from '@/hooks/useWindowDimensions';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const data = JSON.parse(localStorage.getItem(STORAGE_THEME));

    if (data !== null) {
      return data || 'light';
    }

    return 'light';
  });

  useEffect(() => {
    if (HAS_WINDOW) {
      localStorage.setItem(STORAGE_THEME, JSON.stringify(theme));
    }
  }, [theme]);

  const value = useMemo(() => {
    return {theme, setTheme};
  }, [theme, setTheme]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  return useContext(AppContext);
};
