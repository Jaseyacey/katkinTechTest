import React, { useState, useEffect } from 'react';
import './index.css';
import cat from '../src/image/cat.png';

interface ApiResponse {
  title: string;
  message: string;
  totalPrice: number;
  freeGift: boolean;
}

const DeliveryMessage: React.FC = () => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/comms/your-next-delivery/ff535484-6880-4653-b06e-89983ecf4ed5');
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

  if (loading) return <div className="text-center text-gray-500">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div className="relative max-w-3xl mx-auto bg-white rounded-lg p-6 mt-8 flex border border-gray-300">
      <img src={cat} alt="Cat" className="w-1/3 h-auto rounded-lg mr-4" />
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">{data?.title}</h1>
        <p className="text-gray-700 mb-4">{data?.message}</p>
        <p className="text-lg font-semibold text-gray-900 mb-4">Total price: <span className="text-gray-900">£{data?.totalPrice.toFixed(2)}</span></p>
        <div className="flex justify-between">
          <button className="bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-500">See Details</button>
          <button className="bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded hover:bg-gray-200">Edit Delivery</button>
        </div>
      </div>
      {data?.freeGift && (
        <span className="
        absolute top-0 right-0 transform 
        translate-x-1/2 
        -translate-y-1/2 
        rotate-12 bg-pink-300 
        text-pink-800 
        font-bold rounded-full px-2 py-1 
        text-sm">
          FREE GIFT
        </span>
      )}
    </div>
  );
};

export default DeliveryMessage;