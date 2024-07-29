import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, setQuantity } from '../../features/cart/cartSlice';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Cart({ toggleCart }) {

    const cartItems = useSelector((state) => state.cart); // Access cart array correctly
    const dispatch = useDispatch();

    const handleRemove = (id) => {
        dispatch(removeFromCart(id));
    };

    // Handle Dispatch
    const cartHandler = (id, quantity) => {
        if (quantity > 0) {
            dispatch(setQuantity({ id, quantity: parseInt(quantity, 10) }));
        } else {
            dispatch(removeFromCart(id));
        }
    };

    const totalAmount = cartItems ? cartItems.reduce((total, item) => total + item.price * item.quantity, 0) : 0;
    const { t } = useTranslation();

    return (
        <div>
            <div className='flex flex-row justify-end items-center w-full h-max'>
                <button
                    onClick={toggleCart}
                    className="text-red-600 hover:text-red-800"
                >
                    <i className="fa-solid fa-times"></i>
                </button>
            </div>
            <div className='relative'>
                <h2 className="text-3xl font-bold text-center mb-8 dark:text-white">{t('Cart.cart')}</h2>
                {cartItems.length === 0 ? (
                    <p className="text-center dark:text-gray-300">{t('Cart.empty')}</p>
                ) : (
                    <div className="w-full flex flex-col gap-4 overflow-y-auto h-72">
                        {cartItems.map((item) => (
                            <div key={item.id} className="w-full flex flex-row justify-between items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                                <div className="flex flex-row items-center gap-4">
                                    <img alt={item.name} src={item.image || 'https://placehold.co/600x400/crimson/white?text=Image'} className="object-cover rounded-full w-16 h-16" />
                                    <div>
                                        <h3 className="font-semibold text-lg dark:text-white">{item.name}</h3>
                                        <p className="text-gray-600 dark:text-gray-400">${isNaN(item.price) ? 'N/A' : parseFloat(item.price).toFixed(2)}</p>
                                    </div>
                                </div>
                                <div className="flex flex-row items-center gap-4">
                                    <input
                                        type="number"
                                        min="1"
                                        // value={item.quantity}
                                        value={isNaN(item.quantity) ? 'N/A' : item.quantity}
                                        onChange={(e) => cartHandler(item.id, e.target.value)}
                                        className="w-16 px-2 py-1 rounded text-black"
                                    />
                                    <button
                                        onClick={() => handleRemove(item.id)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        <i className="fa-lg fa-solid fa-trash-can text-red-600"></i>
                                    </button>
                                </div>
                            </div>
                        ))}
                        <button className="self-center mt-4 px-8 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 mb-20">
                            <Link to="/cart" onClick={toggleCart}>{t('Cart.goto')}</Link>
                        </button>
                        <div className="absolute bottom-0 w-full flex justify-between items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                            <h3 className="font-semibold text-lg dark:text-white">{t('Cart.total')}</h3>
                            <h3 className="font-semibold text-lg dark:text-white">${totalAmount ? totalAmount.toFixed(2) : 0}</h3>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Cart;
