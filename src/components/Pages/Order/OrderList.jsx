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
        return <Loader />;
    }

    const handleRowClick = (record) => {
        navigate(`/track-order/${record.id}`);
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
        <div className="p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 dark:text-white">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 md:mb-8 lg:mb-10 xl:mb-12">
                {t('OrderList.title')}
            </h1>
            <Table
                dataSource={orders}
                columns={columns}
                rowKey="id"
                className="bg-white rounded-xl shadow-md sm:shadow-lg lg:shadow-xl"
                rowClassName="hover:cursor-pointer"
                onRow={(record) => ({
                    onClick: () => handleRowClick(record),
                })}
                scroll={{ x: 'max-content' }}
            />
        </div>
    );
};

export default OrderList;
