import React, { useState, useEffect } from 'react';

interface ApiResponse {
  title: string;
  message: string;
  totalPrice: string;
  freeGift: boolean;
}

const DeliveryMessage: React.FC = () => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/comms/your-next-delivery/ff535484-6880-4653-b06e-89983ecf4ed5');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>{data?.title}</h1>
      <p>{data?.message}</p>
      <p>Total Price: {data?.totalPrice}</p>
      <p>Free Gift: {data?.freeGift ? 'Yes' : 'No'}</p>
    </div>
  );
};

export default DeliveryMessage;