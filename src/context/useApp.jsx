import { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { STORAGE_WIDGET, HAS_WINDOW } from '@/helpers/constant';
import useWindowDimensions from '@/hooks/useWindowDimensions';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const { width, height } = useWindowDimensions();
  const [loggedIn, setLoggedIn] = useState(false);
  const [refetchWidget, setRefetchWidget] = useState(false);

  const [widgets, setWidgets] = useState(() => {
    const widgets = JSON.parse(localStorage.getItem(STORAGE_WIDGET));

    if (widgets !== null) {
      return widgets || [];
    }

    return [];
  });

  useEffect(() => {
    if (HAS_WINDOW) {
      localStorage.setItem(STORAGE_WIDGET, JSON.stringify(widgets));
    }
  }, [widgets, refetchWidget]);

  const value = useMemo(() => {
    return {};
  }, []);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  return useContext(AppContext);
};
