import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../../../features/cart/cartSlice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addOrder } from '../../../database/orderService';
import { useTranslation } from 'react-i18next';
import { notify } from '../../Utils/Notify';

const Checkout = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zip: '',
    });

    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart);
    const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handlePayment = async () => {
        try {
            notify('success', t('notify.payment_success'));

            // Add each item in the cart to Firestore
            const orderPromises = cartItems.map(item => {
                const order = {
                    order_id: Date.now(), // Unique ID for the order
                    product_name: item.name,
                    customer_name: formData.name,
                    price: item.price,
                    quantity: item.quantity,
                    status: 'ongoing', // Default status
                };
                return addOrder(order); // Add order to Firestore
            });
            await Promise.all(orderPromises);

            // Clear cart after successful payment
            dispatch(clearCart());
        } catch (error) {
            notify('error', t('notify.payment_error', { error: error.message }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validateForm();

        if (isValid) {
            handlePayment();
        }
    };

    const validateForm = () => {
        const { name, email, address, city, state, zip } = formData;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!name) {
            notify('error', t('notify.name_required'));
            return false;
        }

        if (name.length < 2 || !/^[A-Za-z]+$/.test(name)) {
            notify('error', t('notify.name_rules'));
            return false;
        }

        if (!email) {
            notify('error', t('notify.email_required'));
            return false;
        }

        if (!emailRegex.test(email)) {
            notify('error', t('notify.email_rules'))
            return false;
        }

        if (!address) {
            notify('error', t('notify.address_required'));
            return false;
        }

        if (!city) {
            notify('error', t('notify.city_required'));
            return false;
        }

        if (!state) {
            notify('error', t('notify.state_required'));
            return false;
        }

        if (!zip) {
            notify('error', t('notify.zip_required'));
            return false;
        }

        return true;
    };

    const { t } = useTranslation();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-8 dark:text-white">
            <ToastContainer />
            <h1 className="text-4xl font-bold mb-8">{t('Checkout.checkout')}</h1>
            {
                totalAmount <= 0 ?
                    <div>{t('Checkout.empty')}</div> :
                    <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-6 bg-white rounded-lg p-8 shadow-lg dark:bg-gray-700">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                {t('Checkout.fullname')}
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded dark:bg-gray-600 dark:text-white"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                {t('Checkout.email')}
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded dark:bg-gray-600 dark:text-white"
                            />
                        </div>
                        <div>
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                {t('Checkout.address')}
                            </label>
                            <input
                                id="address"
                                name="address"
                                type="text"
                                value={formData.address}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded dark:bg-gray-600 dark:text-white"
                            />
                        </div>
                        <div className="flex flex-wrap space-y-4 sm:space-y-0 sm:space-x-4">
                            <div className="w-full sm:w-1/3">
                                <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {t('Checkout.city')}
                                </label>
                                <input
                                    id="city"
                                    name="city"
                                    type="text"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded dark:bg-gray-600 dark:text-white"
                                />
                            </div>
                            <div className="w-full sm:w-1/3">
                                <label htmlFor="state" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {t('Checkout.state')}
                                </label>
                                <input
                                    id="state"
                                    name="state"
                                    type="text"
                                    value={formData.state}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded dark:bg-gray-600 dark:text-white"
                                />
                            </div>
                            <div className="w-full sm:w-1/3">
                                <label htmlFor="zip" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {t('Checkout.zip')}
                                </label>
                                <input
                                    id="zip"
                                    name="zip"
                                    type="text"
                                    value={formData.zip}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded dark:bg-gray-600 dark:text-white"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="total" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                {t('Checkout.total')}
                            </label>
                            <input
                                id="total"
                                name="total"
                                type="text"
                                readOnly
                                value={`$${totalAmount.toFixed(2)}`}
                                className="w-full px-3 py-2 border rounded dark:bg-gray-600 dark:text-white bg-gray-100 cursor-not-allowed"
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
                            >
                                {t('Checkout.payment')}
                            </button>
                        </div>
                    </form>
            }
        </div>
    );
};

export default Checkout;
