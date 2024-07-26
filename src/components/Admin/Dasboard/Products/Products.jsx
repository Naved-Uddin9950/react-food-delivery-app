import React, { useState, useEffect } from 'react';
import { Table, Select, Modal, Space, Form, Input, Button, message, Upload, Image } from 'antd';
import { Breadcrumb } from 'antd';
import { HomeOutlined, ShoppingCartOutlined, EditOutlined, DeleteTwoTone } from '@ant-design/icons';
import { collection, getDocs, updateDoc, doc, deleteDoc, addDoc } from 'firebase/firestore';
import { db } from '../../../../firebaseConfig';
import { UploadOutlined } from '@ant-design/icons';
import { uploadImage } from '../../../../features/uploadImage';
import { useLoaderData } from 'react-router-dom';

const LOCAL_STORAGE_KEY = 'cachedProducts';

export const fetchProducts = async () => {
    try {
        const cachedProducts = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (cachedProducts) {
            return JSON.parse(cachedProducts);
        }

        const productsCollection = collection(db, 'products');
        const productSnapshot = await getDocs(productsCollection);
        const products = productSnapshot.docs.map(doc => ({
            key: doc.id,
            ...doc.data(),
        }));

        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(products));
        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
};

const { Option } = Select;

const Products = () => {
    const productsData = useLoaderData();
    const[products, setProducts] = useState(productsData)
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [pageSize, setPageSize] = useState(5);
    const [sortOption, setSortOption] = useState('idAsc');
    const [selectedStatus, setSelectedStatus] = useState('All');
    const [deletingProduct, setDeletingProduct] = useState(null);
    const [editingProduct, setEditingProduct] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [thumbnail, setThumbnail] = useState(null);
    const [images, setImages] = useState([]);
    const [categories, setCategories] = useState();
    const [categoryOptions, setCategoryOptions] = useState([]);


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoriesCollection = collection(db, 'categories');
                const categoriesSnapshot = await getDocs(categoriesCollection);
                const categoriesList = categoriesSnapshot.docs.map(doc => ({
                    key: doc.id,
                    ...doc.data(),
                }));
                setCategories(categoriesList);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        if (categories) {
            const items = categories
                .filter(item => item.status === 'Active')
                .map(item => item.name);
            setCategoryOptions(items);
        }
    }, [categories]);

    useEffect(() => {
        const applyFiltersAndSorting = () => {
            let updatedProducts = [...products];

            // Apply status filter
            if (selectedStatus !== 'All') {
                updatedProducts = updatedProducts.filter(product => product.status === selectedStatus);
            }

            // Apply sorting
            updatedProducts.sort((a, b) => {
                const idA = a.id || '';
                const idB = b.id || '';
                const nameA = a.name || '';
                const nameB = b.name || '';
                const priceA = a.price || 0;
                const priceB = b.price || 0;

                switch (sortOption) {
                    case 'idAsc':
                        return idA.localeCompare(idB);
                    case 'idDesc':
                        return idB.localeCompare(idA);
                    case 'priceAsc':
                        return priceA - priceB;
                    case 'priceDesc':
                        return priceB - priceA;
                    case 'nameAsc':
                        return nameA.localeCompare(nameB);
                    case 'nameDesc':
                        return nameB.localeCompare(nameA);
                    default:
                        return 0;
                }
            });

            setFilteredProducts(updatedProducts);
        };

        applyFiltersAndSorting();
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(products));
    }, [products, sortOption, selectedStatus]);

    const handleStatusChange = async (value, record) => {
        try {
            const productRef = doc(db, 'products', record.key);
            await updateDoc(productRef, { status: value });
            setProducts(products.map(product =>
                product.key === record.key ? { ...product, status: value } : product
            ));
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const handleCancel = () => {
        setDeletingProduct(null);
        setEditingProduct(null);
        setIsAdding(false);
        setThumbnail(null);
        setImages([]);
    };

    const handleDelete = async () => {
        try {
            if (deletingProduct) {
                await deleteDoc(doc(db, 'products', deletingProduct));
                setProducts(products.filter(product => product.key !== deletingProduct));
                setDeletingProduct(null);
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleAddProduct = async (values) => {
        let cleanedValues;
        let thumb;
        thumbnail ? thumb = await uploadImage(thumbnail) : thumb = null;
        try {
            cleanedValues = Object.keys(values).reduce((acc, key) => {
                acc[key] = values[key] !== undefined ? values[key] : null;
                return acc;
            }, {});
            const docRef = await addDoc(collection(db, 'products'), {
                ...cleanedValues,
                thumbnail: thumb || null,
                // images
            });
            setProducts([...products, { key: docRef.id, ...values, thumbnail, images }]);
            message.success('Product added successfully');
            handleCancel();
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const handleUpdateProduct = async (values) => {
        let cleanedValues;
        let thumbPromise = thumbnail ? uploadImage(thumbnail) : Promise.resolve(null);

        try {
            cleanedValues = Object.keys(values).reduce((acc, key) => {
                acc[key] = values[key] !== undefined ? values[key] : null;
                return acc;
            }, {});

            const thumb = await thumbPromise;

            if (editingProduct) {
                const productRef = doc(db, 'products', editingProduct.key);

                const updateData = {
                    ...cleanedValues,
                    thumbnail: thumb || editingProduct.thumbnail,
                };

                await updateDoc(productRef, updateData);

                setProducts(products.map(product =>
                    product.key === editingProduct.key ? { ...product, ...updateData } : product
                ));

                message.success('Product updated successfully');
                handleCancel();
            }
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };


    const statusOptions = ['All', 'Active', 'Inactive'];
    // const categoryOptions = ['Pizza', 'Burger', 'Soft Drinks']; 
    const tagOptions = ['Vegetarian', 'Non-Vegetarian', 'Vegan'];
    const availabilityOptions = ['In Stock', 'Out Of Stock'];

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
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (text) => `$${(Number(text) || 0).toFixed(2)}`,
            sorter: (a, b) => (a.price || 0) - (b.price || 0),
            sortOrder: sortOption === 'priceAsc' ? 'ascend' : sortOption === 'priceDesc' ? 'descend' : null,
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
                    <a onClick={() => { setEditingProduct(record); setIsAdding(false); }} className='text-2xl'>
                        <EditOutlined />
                    </a>
                    <a onClick={() => setDeletingProduct(record.key)} className='text-2xl'>
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

    const handleThumbnailChange = async (e) => {
        const { file, onSuccess, onError } = e;
        const reader = new FileReader();
        reader.onloadend = () => {
            setThumbnail(reader.result);
        };
        reader.readAsDataURL(file);

        try {
            onSuccess("Thumbnail uploaded successfully");
            message.success('Thumbnail uploaded successfully');
        } catch (error) {
            onError(error);
            message.error('Thumbnail upload failed');
        }
    };

    const handleImagesChange = (info) => {
        if (info.file.status === 'done') {
            setImages(prevImages => [...prevImages, info.file.response.url]);
        }
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
                        title: <span className='dark:text-white'>Products</span>,
                    },
                ]}
                className="mb-4 text-lg dark:text-white"
            />
            <h1 className="text-2xl font-bold mb-4">Products</h1>

            <div className="mb-4">
                <Button type="primary" onClick={() => { setEditingProduct(null); setIsAdding(true); }}>Add Product</Button>

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
                        <Option value="priceAsc">Price: Low to High</Option>
                        <Option value="priceDesc">Price: High to Low</Option>
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
                dataSource={filteredProducts}
                columns={columns}
                pagination={{ pageSize, showSizeChanger: false }}
            />

            <Modal
                title={isAdding ? "Add Product" : "Edit Product"}
                visible={isAdding || editingProduct !== null}
                onCancel={handleCancel}
                footer={null}
            >
                <Form
                    layout="vertical"
                    onFinish={isAdding ? handleAddProduct : handleUpdateProduct}
                    initialValues={isAdding ? {} : editingProduct}
                    className='h-[27rem] overflow-y-auto'
                >
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[{ required: true, message: 'Please input the product name!' }]}
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
                        name="price"
                        label="Price"
                        rules={[{ required: true, message: 'Please input the price!' }]}
                    >
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item
                        name="quantity"
                        label="Quantity"
                        rules={[{ required: true, message: 'Please input the quantity!' }]}
                    >
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item
                        name="category"
                        label="Category"
                    >
                        <Select mode="multiple">
                            {categoryOptions.map(option => (
                                <Option key={option} value={option}>{option}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="ingredients"
                        label="Ingredients"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="availability"
                        label="Availability"
                    >
                        <Select>
                            {availabilityOptions.map(option => (
                                <Option key={option} value={option}>{option}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="tags"
                        label="Tags"
                    >
                        <Select>
                            {tagOptions.map(option => (
                                <Option key={option} value={option}>{option}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="preparation_time"
                        label="Preparation Time"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="nutrients"
                        label="Nutrients"
                    >
                        <Input />
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
                    <Form.Item
                        label="Thumbnail"
                    >
                        <Upload
                            customRequest={handleThumbnailChange}
                            showUploadList={false}
                            maxCount={1}
                        >
                            <Button icon={<UploadOutlined />}>Upload Thumbnail</Button>
                        </Upload>
                        {thumbnail &&
                            <div className='flex flex-col justify-center items-center gap-2 my-2 border rounded-xl w-max'>
                                <Image src={thumbnail} width={100} height={100} className='rounded-t-xl object-coverx' />
                                <DeleteTwoTone className='mb-2 text-xl cursor-pointer' onClick={() => setThumbnail(null)} />
                            </div>
                        }
                    </Form.Item>
                    {/* <Form.Item
                        label="Images"
                    >
                        <Upload
                            customRequest={handleImagesChange}
                            multiple
                            showUploadList={false}
                        >
                            <Button icon={<UploadOutlined />}>Upload Images</Button>
                        </Upload>
                        <div className="mt-2">
                            {images.map((image, index) => (
                                <div key={index} className="inline-block mr-2">
                                    <Image src={image} width={100} />
                                    <Button
                                        type="link"
                                        danger
                                        onClick={() => setImages(images.filter((_, i) => i !== index))}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </Form.Item> */}
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            {isAdding ? "Add Product" : "Update Product"}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title="Delete Product"
                visible={!!deletingProduct}
                onCancel={() => setDeletingProduct(null)}
                onOk={handleDelete}
                okText="Delete"
                cancelText="Cancel"
            >
                <p>Are you sure you want to delete this product?</p>
            </Modal>
        </div>
    );
};

export default Products;
