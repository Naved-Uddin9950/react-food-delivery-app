import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Typography, Button, notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../../features/cart/cartSlice';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import Loader from '../../Utils/Loader';

const { Title, Paragraph } = Typography;

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [count, setCount] = useState(1); // Default to 1
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart);

    const [api, contextHolder] = notification.useNotification();
    const notify = (type, message) => {
        api[type]({
            message: message,
            showProgress: true,
            pauseOnHover: false
        });
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const productRef = doc(db, 'products', id);
                const productSnapshot = await getDoc(productRef);
                if (productSnapshot.exists()) {
                    setProduct(productSnapshot.data());
                } else {
                    console.error('Product not found!');
                }
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <Loader />
        );
    }

    if (!product) {
        return <p>Product not found</p>;
    }

    const {
        name,
        description,
        price,
        thumbnail,
        tags,
        ingredients,
        nutrients,
        preparation_time,
        availability,
        quantity
    } = product;

    const formattedPrice = () => {
        if (typeof price === 'number') {
            return price.toFixed(2);
        } else if (typeof price === 'string') {
            const parsedPrice = parseFloat(price);
            return isNaN(parsedPrice) ? 'N/A' : parsedPrice.toFixed(2);
        } else {
            return 'N/A';
        }
    };

    const handleCount = (operation) => {
        if (operation === '+' && count < quantity) {
            setCount(prev => prev + 1);
        } else if (operation === '-' && count > 1) {
            setCount(prev => prev - 1);
        }
    };

    const handleAddToCart = () => {
        dispatch(addToCart({
            id,
            name,
            description,
            price: parseFloat(price) || 0,
            image: thumbnail,
            quantity: count,
        }));

        notify('success', 'Item added successfully');
    };

    return (
        < div className="container mx-auto px-4 py-12" >
            {contextHolder}
            <Card className='dark:bg-[#384152] bg-white border-none shadow-dark'>
                <div className="flex flex-col lg:flex-row">
                    <div className="lg:w-1/2">
                        <img src={thumbnail || 'https://placehold.co/600x400/crimson/white?text=Image'} alt={name} className="object-cover w-full h-full max-h-[30rem] rounded-xl" />
                    </div>
                    <div className="lg:w-1/2 lg:pl-8">
                        <Title level={2} className='text-black dark:text-white'>{name}</Title>
                        <Paragraph className="text-xl font-semibold text-black dark:text-white">Price: ${formattedPrice()}</Paragraph>
                        <Paragraph className='flex flex-row gap-3'>
                            {tags === 'Vegetarian' && (
                                <span className='bg-green-500 text-white px-2 py-1 rounded shadow-dark'>{tags}</span>
                            )}
                            {tags === 'Non-Vegetarian' && (
                                <span className='bg-red-500 text-white px-2 py-1 rounded shadow-dark'>{tags}</span>
                            )}
                            {tags === 'Vegan' && (
                                <span className='bg-teal-500 text-white px-2 py-1 rounded shadow-dark'>{tags}</span>
                            )}
                            {tags !== 'Vegetarian' && tags !== 'Non-Vegetarian' && tags !== 'Vegan' && (
                                <span>{tags}</span>
                            )}

                            {availability === 'In Stock' && (
                                <span className='bg-green-500 text-white px-2 py-1 rounded shadow-dark'>{availability}</span>
                            )}
                            {availability === 'Out Of Stock' && (
                                <span className='bg-red-500 text-white px-2 py-1 rounded shadow-dark'>{availability}</span>
                            )}
                            {availability !== 'In Stock' && availability !== 'Out Of Stock' && (
                                <span>{availability}</span>
                            )}
                        </Paragraph>
                        {
                            availability === 'In Stock' &&
                            <div className='flex flex-row justify-center items-center w-max shadow-dark h-8 rounded-xl'>
                                <Button type="primary" onClick={() => handleCount('-')} className='rounded-r-none h-full'>-</Button>
                                <input
                                    min={1}
                                    max={quantity}
                                    value={count}
                                    onChange={(e) => setCount(Math.max(1, Math.min(quantity, Number(e.target.value))))}
                                    className='w-16 h-full py-1 text-center'
                                />
                                <Button type="primary" onClick={() => handleCount('+')} className='rounded-l-none h-full'>+</Button>
                            </div>
                        }
                        <Button type="primary" onClick={handleAddToCart} className='mt-4 shadow-dark'>Add to Cart</Button>
                        <Paragraph className='text-black dark:text-white text-lg font-semibold mt-4'>Description: {description}</Paragraph>
                        <Paragraph className='text-black dark:text-white text-lg'>Ingredients: {ingredients}</Paragraph>
                        <Paragraph className='text-black dark:text-white text-lg'>Preparation Time: {preparation_time}</Paragraph>
                        <Paragraph className='text-black dark:text-white text-lg'>Nutrients: {nutrients}</Paragraph>
                    </div>
                </div>
            </Card>
        </div >
    );
};

export default ProductDetails;
