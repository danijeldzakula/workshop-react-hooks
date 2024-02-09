import { arraysAreEqual } from '@/helpers';
import { memo, useEffect, useState, useCallback } from 'react';

const initNames = ['React', 'Memo'];

const RenderName = ({ setData }) => {
  const [names, setNames] = useState(initNames);

  const addNewName = () => {
    setNames((prev) => {
      if (prev.includes('❤')) {
        return prev;
      }

      const reverse = [...prev];
      reverse.splice(1, 0, '❤');

      return [...reverse];
    });
  };

  const reverseNames = () => {
    setNames((prev) => {
      const reverse = [...prev];

      reverse.reverse();

      return reverse;
    });
  };

  const resetNames = () => {
    setNames(initNames);
  };

  const listItems = useCallback(() => {
    return names.map((item) => {
      return <li key={item.toString()}>{item}</li>;
    });
  }, [names]);

  useEffect(() => {
    setData((prev) => {
      return {
        ...prev,
        names: names,
      };
    });
  }, [names]);

  const isDisabled = arraysAreEqual(initNames, names);

  console.log('re-render names');

  return (
    <div className='p-8'>
      <h2 className='mb-4 pb-4 border-b'>Render Name</h2>

      <div className='flex gap-4 mb-4'>
        <button className='rounded-md p-2 px-4 bg-neutral-200' onClick={addNewName}>Add new name</button>
        <button className='rounded-md p-2 px-4 bg-neutral-200' onClick={reverseNames}>Reverse</button>
        <button className='rounded-md p-2 px-4 bg-neutral-200' disabled={isDisabled} onClick={resetNames}>
          Reset
        </button>
      </div>

      <ul>{listItems()}</ul>
    </div>
  );
};

export default RenderName;
// export default memo(RenderName);
