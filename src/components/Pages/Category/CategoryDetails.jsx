import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography } from 'antd';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import ProductSection from '../Menu/ProductSection';
import { useDispatch, useSelector } from 'react-redux'; // Import useSelector
import Loader from '../../Utils/Loader';
import { addToCart, removeFromCart, setQuantity } from '../../../features/cart/cartSlice';

const { Title } = Typography;

const CategoryDetails = () => {
    const { id } = useParams(); // Get the category ID from URL params
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categoryName, setCategoryName] = useState('');

    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart);

    useEffect(() => {
        const fetchCategoryName = async () => {
            try {
                const categoriesRef = collection(db, 'categories');
                const categorySnapshot = await getDocs(categoriesRef);
                const categories = categorySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                // Find the category name that matches the given ID
                const category = categories.find(item => item.id === id);
                if (category) {
                    setCategoryName(category.name); // Set the category name
                }
            } catch (error) {
                console.error('Error fetching category names:', error);
            }
        };

        const fetchProducts = async () => {
            if (!categoryName) return; // Wait until categoryName is set

            try {
                const productsRef = collection(db, 'products');
                // Query products where their category array includes the category name
                const q = query(productsRef, where('category', 'array-contains', categoryName), where('status', '==', 'Active'));
                const querySnapshot = await getDocs(q);

                const fetchedProducts = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                setProducts(fetchedProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        // Fetch category names first and then fetch products
        fetchCategoryName().then(() => fetchProducts());
    }, [id, categoryName]); // Remove categoryName if not necessary

    if (loading) {
        return (
            <Loader />
        );
    }

    if (products.length === 0) {
        return <p className='text-black dark:text-white h-screen flex flex-row justify-center items-center font-bold text-2xl'>No products found for this category. 😔</p>;
    }

    const formattedPrice = (price) => {
        if (typeof price === 'number') {
            return price.toFixed(2);
        } else if (typeof price === 'string') {
            const parsedPrice = parseFloat(price);
            return isNaN(parsedPrice) ? 'N/A' : parsedPrice.toFixed(2);
        } else {
            return 'N/A';
        }
    };

    const cartHandler = (id, name, description, price, image, quantity) => {
        const existingItem = cartItems.find(item => item.id === id);

        if (existingItem) {
            if (quantity > 0) {
                dispatch(setQuantity({ id, quantity }));
            } else {
                dispatch(removeFromCart(id));
            }
        } else if (quantity > 0) {
            dispatch(addToCart({
                id,
                name,
                description,
                price,
                image,
                quantity: parseInt(quantity, 10) || 0,
            }));
        }
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <Title level={1} className='text-black dark:text-white'>{categoryName}</Title>
            <ProductSection
                products={products}
                cartHandler={cartHandler}
                cartItems={cartItems}
                limit={false}
            />
        </div>
    );
};

export default CategoryDetails;
