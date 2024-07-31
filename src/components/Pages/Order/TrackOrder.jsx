import React, { useState, useEffect } from 'react';
import { db } from '../../../firebaseConfig';
import { doc, onSnapshot } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { Steps, Tooltip, Card } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import Loader from '../../Utils/Loader';
import { useTranslation } from 'react-i18next';

const { Step } = Steps;

const TrackOrder = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [error, setError] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    const orderDocRef = doc(db, 'orders', orderId);

    const unsubscribe = onSnapshot(orderDocRef, (doc) => {
      if (doc.exists()) {
        setOrderDetails(doc.data());
      } else {
        setError(t('OrderTrack.errorOrderNotFound'));
      }
    }, (error) => {
      setError(error.message);
    });

    return () => unsubscribe();
  }, [orderId]);

  const getStatusColor = (status) => {
    switch (status) {
      case t('OrderTrack.orderPlaced'):
        return 'text-blue-500';  // Light blue
      case t('OrderTrack.ongoing'):
        return 'text-yellow-500';  // Yellow
      case t('OrderTrack.shipped'):
        return 'text-orange-500';  // Orange
      case t('OrderTrack.delivered'):
        return 'text-green-500';  // Green
      case t('OrderTrack.cancelled'):
        return 'text-red-500';  // Red
      default:
        return 'text-gray-500';  // Default color
    }
  };

  const steps = [
    {
      title: t('OrderTrack.orderPlaced'),
      description: t('OrderTrack.orderPlaced_desc'),
    },
    {
      title: t('OrderTrack.ongoing'),
      description: t('OrderTrack.ongoing_desc'),
    },
    {
      title: t('OrderTrack.shipped'),
      description: t('OrderTrack.shipped_desc'),
    },
    {
      title: t('OrderTrack.delivered'),
      description: t('OrderTrack.delivered_desc'),
    },
    {
      title: t('OrderTrack.cancelled'),
      description: t('OrderTrack.cancelled_desc'),
    },
  ];

  // Determine which steps to show based on the order status
  const filteredSteps = orderDetails?.status === 'Completed'
    ? steps.filter(step => step.title !== t('OrderTrack.cancelled'))  // Exclude Cancelled if Completed
    : orderDetails?.status === 'Cancelled'
      ? steps.filter(step => step.title !== t('OrderTrack.delivered'))  // Exclude Delivered if Cancelled
      : steps;

  const getCurrentStep = (status) => {
    if (status === 'Completed') {
      return filteredSteps.findIndex(step => step.title === t('OrderTrack.delivered'));  // Mark Delivered as finished
    } else if (status === 'Cancelled') {
      return filteredSteps.length - 1; // Show Cancelled as the last step
    } else {
      return filteredSteps.findIndex(step => step.title === t(`OrderTrack.${status.toLowerCase()}`)); // Default index
    }
  };

  const currentStep = orderDetails ? getCurrentStep(orderDetails.status) : 0;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">{t('OrderTrack.orderTracking')}</h2>
      {error ? (
        <div className="text-red-500">{error}</div>
      ) : orderDetails ? (
        <div className="border border-gray-300 rounded-lg p-4 shadow-dark">
          <h3 className="text-lg font-medium mb-4 bg-white rounded-xl py-1 px-2 w-max">{t('OrderTrack.orderID', { orderId })}</h3>
          <Steps current={currentStep} direction="horizontal">
            {filteredSteps.map((step, index) => (
              <Step
                key={index}
                title={<Tooltip title={step.description}><span className={`font-bold ${getStatusColor(step.title)}`}>{step.title}</span></Tooltip>}
                status={index <= currentStep ? 'finish' : 'wait'}
                icon={index === currentStep ? <InfoCircleOutlined className={getStatusColor(step.title)} /> : undefined}
              />
            ))}
          </Steps>
          <p className={`text-xl font-bold mt-4 ${getStatusColor(orderDetails.status)}`}>
            Status: {t(`OrderTrack.${(orderDetails.status).toLowerCase()}`)}
          </p>
          <div className="mt-4 shadow-lg rounded-xl">
            <Card title={t('OrderTrack.orderDetails')} bordered={false}>
              <p><strong>{t('OrderTrack.customerName')}</strong> {orderDetails.customer_name}</p>
              <p><strong>{t('OrderTrack.productName')}</strong> {orderDetails.product_name}</p>
              <p><strong>{t('OrderTrack.quantity')}</strong> {orderDetails.quantity}</p>
              <p><strong>{t('OrderTrack.price')}</strong> ${parseFloat(orderDetails.price).toFixed(2)}</p>
              <p><strong>{t('OrderTrack.total')}</strong> ${(orderDetails.price * orderDetails.quantity).toFixed(2)}</p>
            </Card>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default TrackOrder;
