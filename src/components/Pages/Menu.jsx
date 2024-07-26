import React from 'react';
import { Typography, Spin } from 'antd';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { useLoaderData } from 'react-router-dom';
import { addToCart, setQuantity } from '../../features/cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import ProductSection from './Menu/ProductSection';
import { useCount } from '../../hooks';
import CategorySection from './Menu/CategorySection';

const { Title } = Typography;

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

export const menuLoader = async () => {
  const [categories, products] = await Promise.all([
    fetchCategories(),
    fetchProducts()
  ]);
  return { categories, products };
};


const Menu = () => {
  const { categories, products } = useLoaderData();

  if (!categories || !products) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

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

  const productCount = useCount(products);
  const activeCategories = categories.filter((item) => item.status === 'Active');

  const sortedCategories = [...categories].sort((a, b) => {
    const countA = productCount[a.name] || 0;
    const countB = productCount[b.name] || 0;
    return countB - countA;
  });

  return (
    <div className="p-4">
      <Title level={2} className="text-center mb-4 text-black dark:text-white">Welcome to {import.meta.env.VITE_APP_NAME}</Title>

      <Title level={2} className="text-black dark:text-white">Categories</Title>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-12'>
        {activeCategories.map(category => (
          <CategorySection
            key={category.id}
            title={category.name}
            description={category.description}
          />
        ))}
      </div>

      <div>
        {sortedCategories.map(category => (
          <ProductSection
            key={category.id}
            title={category.name}
            products={products.filter(product => product.category.includes(category.name))}
            cartHandler={cartHandler}
            cartItems={cartItems}
          />
        ))}
      </div>
    </div>
  );
};

export default Menu;