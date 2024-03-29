import { memo, useCallback } from 'react';

const RenderBoth = ({ names, numbers }) => {
  const listItem = useCallback(() => {
    return names.map((item) => {
      return (
        <li style={{ display: 'flex', gridGap: '15px' }} key={item.toString()}>
          {item}
          <p>
            {numbers.map((number) => {
              return <span key={number.toString()}>{number}</span>;
            })}
          </p>
        </li>
      );
    });
  }, [names, numbers]);

  console.log('re-render both');

  return (
    <div>
      <h2 className='mb-4 pb-4 border-b text-2xl'>Render Both</h2>
      <ul>{listItem()}</ul>
    </div>
  );
};

export default RenderBoth;
// export default memo(RenderBoth);
