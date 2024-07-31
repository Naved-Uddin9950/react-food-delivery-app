import React, { useState, useEffect } from 'react';
import { db } from '../../../firebaseConfig';
import { doc, onSnapshot } from 'firebase/firestore';
import { useParams } from 'react-router-dom';

const TrackOrder = () => {
  const { orderId } = useParams();
  const [orderStatus, setOrderStatus] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const orderDocRef = doc(db, 'orders', orderId);

    const unsubscribe = onSnapshot(orderDocRef, (doc) => {
      if (doc.exists()) {
        setOrderStatus(doc.data().status);
      } else {
        setError('Order not found');
      }
    }, (error) => {
      setError(error.message);
    });

    return () => unsubscribe();
  }, [orderId]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Ongoing':
        return 'text-yellow-500';
      case 'Delivered':
        return 'text-green-500';
      case 'Cancelled':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Order Tracking</h2>
      {error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="border border-gray-300 rounded-lg p-4 shadow-lg">
          <h3 className="text-lg font-medium">Order ID: {orderId}</h3>
          <p className={`text-xl font-bold ${getStatusColor(orderStatus)}`}>Status: {orderStatus}</p>
        </div>
      )}
    </div>
  );
};

export default TrackOrder;
