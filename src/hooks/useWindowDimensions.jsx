import { useState, useCallback, useLayoutEffect } from 'react';
import { HAS_WINDOW } from '@/helpers/constant';

export default function useWindowDimensions() {
  const getWindowDimensions = useCallback(() => {
    const width = HAS_WINDOW ? window.innerWidth : null;
    const height = HAS_WINDOW ? window.innerHeight : null;

    return {
      width,
      height
    };
  }, []);

  const [windowDimesionse, setWindowDimensions] = useState(getWindowDimensions());

  useLayoutEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions());
    }

    HAS_WINDOW && window.addEventListener('resize', handleResize);

    return () => {
      HAS_WINDOW && window.removeEventListener('resize', handleResize);
    };
  }, [getWindowDimensions]);

  return windowDimesionse;
}
