import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { useLoaderData } from 'react-router-dom';
import { addToCart, setQuantity } from '../../features/cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import HeroSection from './Home/HeroSection';
import ProductSection from './Menu/ProductSection';
import { useRand } from '../../hooks';
import { useTranslation } from 'react-i18next';

export const fetchCategories = async () => {
    try {
        const categoriesCollection = collection(db, 'categories');
        const categorySnapshot = await getDocs(categoriesCollection);
        return categorySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
};

export const fetchProducts = async () => {
    try {
        const productsCollection = collection(db, 'products');
        const productSnapshot = await getDocs(productsCollection);
        return productSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
};

export const homeLoader = async () => {
    const [categories, products] = await Promise.all([
        fetchCategories(),
        fetchProducts()
    ]);
    return { categories, products };
};

const Home = () => {
    const { categories, products } = useLoaderData();
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [specialOffers, setSpecialOffers] = useState([]);

    useEffect(() => {
        const activeProducts = products.filter(product => product.status === 'Active');
        setFeaturedProducts(useRand([...activeProducts]).slice(0, 5));
        setSpecialOffers(activeProducts.filter(product => product.category.includes('Special Offers')));
    }, []);

    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart);

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

    const { t } = useTranslation();

    return (
        <div className=''>
            <HeroSection />

            <div className="">
                <div className="container mx-auto px-4">
                    <ProductSection title={t("Home.featured")} products={featuredProducts} cartHandler={cartHandler} cartItems={cartItems} />
                </div>
            </div>

            <section className="">
                <div className="container mx-auto px-4">
                    <ProductSection title={t("Home.special")} products={specialOffers} cartHandler={cartHandler} cartItems={cartItems} />
                </div>
            </section>

            <section className="">
                <div className="container mx-auto px-4">
                    {/* <CustomerReviews /> */}
                </div>
            </section>

            <section className="">
                <div className="container mx-auto px-4">
                    {/* <NewsletterSignup /> */}
                </div>
            </section>
        </div>
    );
};

export default Home;