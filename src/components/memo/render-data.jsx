import { memo, useEffect, useState, useCallback, useRef } from 'react';

async function getAllProducts() {
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        message: 'Success',
        data: [
          { _id: 'jhsdjkfhsdfjkdf', title: 'Krem Bananica 45gr' },
          { _id: 'erfsdkfhdfhdjjd', title: 'Coca Cola 0.5l' },
          { _id: 'fdfdryhyhyhythg', title: 'Bambi Plazma 140gr' },
        ],
      });
    }, 1000);
  });
}

const RenderData = () => {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState('idle');
  const [refetch, setRefetch] = useState(false);

  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    setStatus('loading');
    
    getAllProducts()
      .then((res) => {
        if (isMounted.current) {
          setProducts(res.data);
          setStatus('success');
        }
      })
      .catch((error) => {
        console.error(error);
        setStatus('error');
      })
      .finally(() => {
        setStatus('success');
      });

    return () => {
      isMounted.current = false;
    };
  }, [refetch]);

  const productList = useCallback(() => {
    if (status === 'loading') {
      return <p>Loading...</p>;
    }

    return products.map((product) => {
      return (
        <div key={product._id} className="grid gap-4">
          <figure></figure>
          <div>{product.title}</div>
        </div>
      );
    });
  }, [products, status]);

  const handleRefetch = useCallback(() => {
    setRefetch((p) => !p);
  }, []);

  console.log('re-render data');

  return (
    <div>
      <div className='mb-4 pb-4 border-b flex justify-between'>
        <h2 className='text-2xl'>Render Data</h2>
        <button className='rounded-md py-2 px-4 bg-purple-500 text-white' type='button' onClick={handleRefetch}>Refetch</button>
      </div>

      <div>{productList()}</div>
    </div>
  );
};

export default RenderData;
// export default memo(RenderData);
