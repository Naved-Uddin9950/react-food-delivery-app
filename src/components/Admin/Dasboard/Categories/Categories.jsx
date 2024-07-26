import React, { useState, useEffect } from 'react';
import { Table, Select, Modal, Space, Form, Input, Button, message } from 'antd';
import { Breadcrumb } from 'antd';
import { HomeOutlined, ShoppingCartOutlined, EditOutlined, DeleteTwoTone } from '@ant-design/icons';
import { collection, getDocs, updateDoc, doc, deleteDoc, addDoc } from 'firebase/firestore';
import { db } from '../../../../firebaseConfig';
import { useLoaderData } from 'react-router-dom';

const LOCAL_STORAGE_KEY = 'cachedCategories';

export const fetchCategories = async () => {
    try {
        const cachedCategories = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (cachedCategories) {
            return JSON.parse(cachedCategories);
        }

        const categoriesCollection = collection(db, 'categories');
        const categoriesSnapshot = await getDocs(categoriesCollection);
        const categories = categoriesSnapshot.docs.map(doc => ({
            key: doc.id,
            ...doc.data(),
        }));

        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(categories));
        return categories;
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
};

const { Option } = Select;

const Categories = () => {
    const categoriesData = useLoaderData();
    const [categories, setCategories] = useState(categoriesData);
    const [filteredCategories, setFilteredCategories] = useState(categories);
    const [pageSize, setPageSize] = useState(5);
    const [sortOption, setSortOption] = useState('idAsc');
    const [selectedStatus, setSelectedStatus] = useState('All');
    const [deletingCategory, setDeletingCategory] = useState(null);
    const [editingCategory, setEditingCategory] = useState(null);
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        const applyFiltersAndSorting = () => {
            let updatedCategories = [...categories];

            if (selectedStatus !== 'All') {
                updatedCategories = updatedCategories.filter(category => category.status === selectedStatus);
            }

            updatedCategories.sort((a, b) => {
                const idA = a.id || '';
                const idB = b.id || '';
                const nameA = a.name || '';
                const nameB = b.name || '';

                switch (sortOption) {
                    case 'idAsc':
                        return idA.localeCompare(idB);
                    case 'idDesc':
                        return idB.localeCompare(idA);
                    case 'nameAsc':
                        return nameA.localeCompare(nameB);
                    case 'nameDesc':
                        return nameB.localeCompare(nameA);
                    default:
                        return 0;
                }
            });

        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(categories));
            setFilteredCategories(updatedCategories);
        };

        applyFiltersAndSorting();
    }, [categories, sortOption, selectedStatus]);

    const handleStatusChange = async (value, record) => {
        try {
            const categoryRef = doc(db, 'categories', record.key);
            await updateDoc(categoryRef, { status: value });
            setCategories(categories.map(category =>
                category.key === record.key ? { ...category, status: value } : category
            ));
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const handleCancel = () => {
        setDeletingCategory(null);
        setEditingCategory(null);
        setIsAdding(false);
    };

    const handleDelete = async () => {
        try {
            if (deletingCategory) {
                await deleteDoc(doc(db, 'categories', deletingCategory));
                setCategories(categories.filter(category => category.key !== deletingCategory));
                setDeletingCategory(null);
            }
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    const handleAddCategory = async (values) => {
        let name = values.name;
        let description = values.description || null;
        let status = values.status || 'Active';
        try {
            const docRef = await addDoc(collection(db, 'categories'), { name, description, status });
            setCategories([...categories, { key: docRef.id, name, description, status }]);
            message.success('Category added successfully');
            handleCancel();
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };

    const handleUpdateCategory = async (values) => {
        let name = values.name;
        let description = values.description || null;
        let status = values.status || 'Active';
        try {
            if (editingCategory) {
                const categoryRef = doc(db, 'categories', editingCategory.key);

                const updateData = { name, description, status };

                await updateDoc(categoryRef, updateData);

                setCategories(categories.map(category =>
                    category.key === editingCategory.key ? { ...category, ...updateData } : category
                ));

                message.success('Category updated successfully');
                handleCancel();
            }
        } catch (error) {
            console.error('Error updating category:', error);
        }
    };


    const statusOptions = ['All', 'Active', 'Inactive'];

    const columns = [
        {
            title: 'ID',
            dataIndex: 'key',
            key: 'key',
            sorter: (a, b) => (a.id || '').localeCompare(b.id || ''),
            sortOrder: sortOption === 'idAsc' ? 'ascend' : sortOption === 'idDesc' ? 'descend' : null,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => (a.name || '').localeCompare(b.name || ''),
            sortOrder: sortOption === 'nameAsc' ? 'ascend' : sortOption === 'nameDesc' ? 'descend' : null,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status, record) => (
                <Select
                    defaultValue={status}
                    onChange={(value) => handleStatusChange(value, record)}
                    style={{ width: 120 }}
                >
                    <Option value="Active">Active</Option>
                    <Option value="Inactive">Inactive</Option>
                </Select>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <a onClick={() => { setEditingCategory(record); setIsAdding(false); }} className='text-2xl'>
                        <EditOutlined />
                    </a>
                    <a onClick={() => setDeletingCategory(record.key)} className='text-2xl'>
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
        <div>
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
                        title: <span className='dark:text-white'>Categories</span>,
                    },
                ]}
                className="mb-4 text-lg dark:text-white"
            />
            <h1 className="text-2xl font-bold mb-4">Categories</h1>

            <div className="mb-4">
                <Button type="primary" onClick={() => { setEditingCategory(null); setIsAdding(true); }}>Add Category</Button>

                <div className="mt-4">
                    <label className="mr-2">Show:</label>
                    <Select
                        defaultValue={5}
                        style={{ width: 120 }}
                        onChange={handlePageSizeChange}
                    >
                        <Option value={5}>5</Option>
                        <Option value={10}>10</Option>
                        <Option value={50}>50</Option>
                        <Option value={100}>100</Option>
                    </Select>

                    <label className="ml-4 mr-2">Sort by:</label>
                    <Select
                        defaultValue="idAsc"
                        style={{ width: 200 }}
                        onChange={handleSortChange}
                    >
                        <Option value="idAsc">ID: Low to High</Option>
                        <Option value="idDesc">ID: High to Low</Option>
                        <Option value="nameAsc">Name: A - Z</Option>
                        <Option value="nameDesc">Name: Z - A</Option>
                    </Select>

                    <label className="ml-4 mr-2">Status:</label>
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
            </div>

            <Table
                dataSource={filteredCategories}
                columns={columns}
                pagination={{ pageSize, showSizeChanger: false }}
            />

            <Modal
                title={isAdding ? "Add Category" : "Edit Category"}
                visible={isAdding || editingCategory !== null}
                onCancel={handleCancel}
                footer={null}
            >
                <Form
                    layout="vertical"
                    onFinish={isAdding ? handleAddCategory : handleUpdateCategory}
                    initialValues={isAdding ? {} : editingCategory}
                    className='h-[27rem] overflow-y-auto'
                >
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[{ required: true, message: 'Please input the category name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Description"
                    >
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item
                        name="status"
                        label="Status"
                    >
                        <Select>
                            <Option value="Active">Active</Option>
                            <Option value="Inactive">Inactive</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            {isAdding ? "Add Category" : "Update Category"}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title="Delete Category"
                visible={!!deletingCategory}
                onCancel={() => setDeletingCategory(null)}
                onOk={handleDelete}
                okText="Delete"
                cancelText="Cancel"
            >
                <p>Are you sure you want to delete this category?</p>
            </Modal>
        </div>
    );
};

export default Categories;
