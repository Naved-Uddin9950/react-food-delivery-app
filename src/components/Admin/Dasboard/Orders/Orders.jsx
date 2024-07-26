import React, { useState, useEffect } from 'react';
import { Table, Select, Modal, Space } from 'antd';
import { Breadcrumb } from 'antd';
import { HomeOutlined, ShoppingCartOutlined, DeleteTwoTone } from '@ant-design/icons';
import { collection, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../../../firebaseConfig';
import { useLoaderData } from 'react-router-dom';

const LOCAL_STORAGE_KEY = 'cachedOrders';

export const fetchOrders = async () => {
  try {
    const cachedOrders = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (cachedOrders) {
      return JSON.parse(cachedOrders);
    }

    const ordersCollection = collection(db, 'orders');
    const orderSnapshot = await getDocs(ordersCollection);
    const orders = orderSnapshot.docs.map(doc => ({
      key: doc.id,
      ...doc.data(),
    }));

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(orders));
    return orders;
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
};


const { Option } = Select;

const Orders = () => {
  const ordersData = useLoaderData();
  const [orders, setOrders] = useState(ordersData);
  const [filteredOrders, setFilteredOrders] = useState(orders);
  const [pageSize, setPageSize] = useState(5);
  const [sortOption, setSortOption] = useState('orderIdAsc');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [deletingOrder, setDeletingOrder] = useState(null);

  useEffect(() => {
    const applyFiltersAndSorting = () => {
      let updatedOrders = [...orders];

      if (selectedStatus !== 'All') {
        updatedOrders = updatedOrders.filter(order => order.status === selectedStatus);
      }

      updatedOrders.sort((a, b) => {
        switch (sortOption) {
          case 'orderIdAsc':
            return a.order_id.toString().localeCompare(b.order_id.toString());
          case 'orderIdDesc':
            return b.order_id.toString().localeCompare(a.order_id.toString());
          case 'priceAsc':
            return (a.price * a.quantity) - (b.price * b.quantity);
          case 'priceDesc':
            return (b.price * b.quantity) - (a.price * a.quantity);
          case 'quantityAsc':
            return a.quantity - b.quantity;
          case 'quantityDesc':
            return b.quantity - a.quantity;
          case 'totalPriceAsc':
            return (a.price * a.quantity) - (b.price * b.quantity);
          case 'totalPriceDesc':
            return (b.price * b.quantity) - (a.price * a.quantity);
          case 'customerNameAsc':
            return a.customer_name.localeCompare(b.customer_name);
          case 'customerNameDesc':
            return b.customer_name.localeCompare(a.customer_name);
          case 'productNameAsc':
            return a.product_name.localeCompare(b.product_name);
          case 'productNameDesc':
            return b.product_name.localeCompare(a.product_name);
          default:
            return 0;
        }
      });

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(orders));
      setFilteredOrders(updatedOrders);
    };

    applyFiltersAndSorting();
  }, [orders, sortOption, selectedStatus]);

  const handleStatusChange = async (value, record) => {
    try {
      const orderRef = doc(db, 'orders', record.key);
      await updateDoc(orderRef, { status: value });
      setOrders(orders.map(order =>
        order.key === record.key ? { ...order, status: value } : order
      ));
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleCancel = () => {
    setDeletingOrder(null);
  };

  const handleDelete = async () => {
    try {
      if (deletingOrder) {
        await deleteDoc(doc(db, 'orders', deletingOrder));
        setOrders(orders.filter(order => order.key !== deletingOrder));
        setDeletingOrder(null);
      }
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const statusOptions = ['All', 'Ongoing', 'Shipped', 'Cancelled', 'Completed'];

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'order_id',
      key: 'order_id',
      sorter: (a, b) => a.order_id.toString().localeCompare(b.order_id.toString()),
      sortOrder: sortOption === 'orderIdAsc' ? 'ascend' : sortOption === 'orderIdDesc' ? 'descend' : null,
    },
    {
      title: 'Customer Name',
      dataIndex: 'customer_name',
      key: 'customer_name',
      sorter: (a, b) => a.customer_name.localeCompare(b.customer_name),
      sortOrder: sortOption === 'customerNameAsc' ? 'ascend' : sortOption === 'customerNameDesc' ? 'descend' : null,
    },
    {
      title: 'Product Name',
      dataIndex: 'product_name',
      key: 'product_name',
      sorter: (a, b) => a.product_name.localeCompare(b.product_name),
      sortOrder: sortOption === 'productNameAsc' ? 'ascend' : sortOption === 'productNameDesc' ? 'descend' : null,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      sorter: (a, b) => a.quantity - b.quantity,
      sortOrder: sortOption === 'quantityAsc' ? 'ascend' : sortOption === 'quantityDesc' ? 'descend' : null,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (text, record) => (
        `$${(record.price).toFixed(2)}`
      ),
    },
    {
      title: 'Total Price',
      key: 'total_price',
      render: (text, record) => (
        `$${(record.price * record.quantity).toFixed(2)}`
      ),
      sorter: (a, b) => (a.price * a.quantity) - (b.price * b.quantity),
      sortOrder: sortOption === 'totalPriceAsc' ? 'ascend' : sortOption === 'totalPriceDesc' ? 'descend' : null,
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (status, record) => (
        <Select
          defaultValue={status}
          onChange={(value) => handleStatusChange(value, record)}
          style={{ width: 120 }}
        >
          <Option value="Ongoing">Ongoing</Option>
          <Option value="Shipped">Shipped</Option>
          <Option value="Cancelled">Cancelled</Option>
          <Option value="Completed">Completed</Option>
        </Select>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => setDeletingOrder(record.key)} className='text-2xl'>
            <DeleteTwoTone twoToneColor="#ff0000" />
          </a>
        </Space>
      ),
    },
  ];

  const handlePageSizeChange = (value) => {
    setPageSize(value);
  };

  const handleSortChange = (value) => {
    setSortOption(value);
  };

  const handleStatusFilterChange = (value) => {
    setSelectedStatus(value);
  };

  return (
    <div className="">
      <Breadcrumb
        items={[
          {
            href: '/dashboard',
            title: <HomeOutlined className='dark:text-white' />,
          },
          {
            title: <ShoppingCartOutlined className="dark:text-white" />,
          },
          {
            title: <span className='dark:text-white'>Orders</span>,
          },
        ]}
        className="mb-4 text-lg dark:text-white"
      />
      <h1 className="text-2xl font-bold mb-4">Orders</h1>

      <div className="mb-4">
        <label className="mr-2">Show:</label>
        <Select
          defaultValue={5}
          style={{ width: 120 }}
          onChange={handlePageSizeChange}
        >
          <Option value={5}>5 orders</Option>
          <Option value={10}>10 orders</Option>
          <Option value={50}>50 orders</Option>
          <Option value={100}>100 orders</Option>
        </Select>

        <label className="ml-4 mr-2">Sort by:</label>
        <Select
          defaultValue="orderIdAsc"
          style={{ width: 360 }}
          onChange={handleSortChange}
        >
          <Option value="orderIdAsc">Order ID - Low to High</Option>
          <Option value="orderIdDesc">Order ID - High to Low</Option>
          <Option value="priceAsc">Total Price - Low to High</Option>
          <Option value="priceDesc">Total Price - High to Low</Option>
          <Option value="quantityAsc">Quantity - Low to High</Option>
          <Option value="quantityDesc">Quantity - High to Low</Option>
          <Option value="totalPriceAsc">Total Price - Low to High</Option>
          <Option value="totalPriceDesc">Total Price - High to Low</Option>
          <Option value="customerNameAsc">Customer Name - A to Z</Option>
          <Option value="customerNameDesc">Customer Name - Z to A</Option>
          <Option value="productNameAsc">Product Name - A to Z</Option>
          <Option value="productNameDesc">Product Name - Z to A</Option>
        </Select>

        <label className="ml-4 mr-2">Filter by Status:</label>
        <Select
          defaultValue="All"
          style={{ width: 200 }}
          onChange={handleStatusFilterChange}
        >
          {statusOptions.map(status => (
            <Option key={status} value={status}>{status}</Option>
          ))}
        </Select>
      </div>

      <Table
        columns={columns}
        dataSource={filteredOrders}
        pagination={{ pageSize, defaultPageSize: 5 }}
      />

      <Modal
        title="Confirm Delete"
        visible={deletingOrder !== null}
        onOk={handleDelete}
        onCancel={handleCancel}
      >
        <p>Are you sure you want to delete this order?</p>
      </Modal>
    </div>
  );
};

export default Orders;
