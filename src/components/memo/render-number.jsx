import { arraysAreEqual, arraysHaveEqualElements } from '@/helpers';
import { memo, useEffect, useState, useCallback } from 'react';

const initNumbers = [1];

const RenderNumber = ({ setData }) => {
  const [numbers, setNumbers] = useState(initNumbers);
  const [hasReverse, setHasReverse] = useState(false);

  const addNewNumber = () => {
    setNumbers((prev) => {
      if (!hasReverse) {
        const last = prev[prev.length - 1] + 1;
        return [...prev, last];
      }

      const first = prev[0] + 1;
      return [first, ...prev];
    });
  };

  const undoNumber = () => {
    setNumbers((prev) => {
      if (!hasReverse) {
        if (prev.length <= initNumbers.length) {
          return [...prev];
        }

        prev.pop();

        return [...prev];
      }

      if (prev.length <= initNumbers.length) {
        return [...prev];
      }

      prev.shift();
      return [...prev];
    });
  };

  const reverseNumbers = () => {
    setHasReverse((p) => !p);
    setNumbers((prev) => {
      const reverse = [...prev];
      reverse.reverse();
      return reverse;
    });
  };

  const resetNumbers = () => {
    setNumbers(initNumbers);
    setHasReverse(false);
  };

  const listItems = useCallback(() => {
    return numbers.map((item) => {
      return <li key={item.toString()}>{item}</li>;
    });
  }, [numbers]);

  useEffect(() => {
    setData((prev) => {
      return {
        ...prev,
        numbers: numbers,
      };
    });
  }, [numbers]);

  const isDisabled = arraysAreEqual(initNumbers, numbers);
  const hasDisabled = arraysHaveEqualElements(initNumbers, numbers);

  console.log('re-render numbers');

  return (
    <div className='p-8'>
      <h2 className='mb-4 pb-4 border-b'>Render Number</h2>

      <div className='flex gap-4 mb-4'>
        <button className='rounded-md p-2 px-4 bg-neutral-200' type="button" onClick={addNewNumber}>Add new number</button>
        <button className='rounded-md p-2 px-4 bg-neutral-200' type="button" onClick={reverseNumbers}>Reverse</button>
        <button className='rounded-md p-2 px-4 bg-neutral-200' type="button" disabled={hasDisabled} onClick={undoNumber}>Undo</button>
        <button className='rounded-md p-2 px-4 bg-neutral-200' type="button" disabled={isDisabled} onClick={resetNumbers}>Reset</button>
      </div>
      
      <ul>{listItems()}</ul>
    </div>
  );
};

export default RenderNumber;
// export default memo(RenderNumber);
