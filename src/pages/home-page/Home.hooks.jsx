import { useState } from 'react';

export const useHome = () => {
  const [data, setData] = useState({
    names: [],
    numbers: [],
    notes: [],
  });

  return {
    names: data.names,
    numbers: data.numbers,
    notes: data.notes,
    setData: setData,
  };
};
