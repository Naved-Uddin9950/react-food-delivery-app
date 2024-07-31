import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import { Table } from 'antd';
import { useTranslation } from 'react-i18next';
import Loader from '../../Utils/Loader';
import { useNavigate } from 'react-router-dom';

const OrderList = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const ordersCollection = collection(db, 'orders');
                const q = query(ordersCollection, where('user_id', '==', user.uid));
                const querySnapshot = await getDocs(q);

                const ordersList = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                ordersList.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

                setOrders(ordersList);
            } catch (error) {
                console.error('Error fetching orders: ', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user]);

    if (loading) {
        return <Loader />
    }

    const handleRowClick = (record) => {
        navigate(`/track-order/${record.id}`); // Navigate to the order detail page
    };

    const columns = [
        {
            title: t('OrderList.order_id'),
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: t('OrderList.product_name'),
            dataIndex: 'product_name',
            key: 'product_name',
        },
        {
            title: t('OrderList.customer_name'),
            dataIndex: 'customer_name',
            key: 'customer_name',
        },
        {
            title: t('OrderList.price'),
            dataIndex: 'price',
            key: 'price',
            render: (text) => `$${parseFloat(text).toFixed(2)}`
        },
        {
            title: t('OrderList.quantity'),
            dataIndex: 'quantity',
            key: 'quantity',
            render: (text) => `${parseInt(text)}`
        },
        {
            title: t('OrderList.status'),
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: t('OrderList.timestamp'),
            dataIndex: 'timestamp',
            key: 'timestamp',
            render: (text) => new Date(text).toLocaleString()
        }
    ];

    return (
        <div className="p-8 dark:text-white">
            <h1 className="text-4xl font-bold mb-8">{t('OrderList.title')}</h1>
            <Table
                dataSource={orders}
                columns={columns}
                rowKey="id"
                className='bg-white rounded-xl shadow-dark'
                rowClassName="hover:cursor-pointer"
                onRow={(record) => ({
                    onClick: () => handleRowClick(record),
                })}
            />
        </div>
    );
};

export default OrderList;
