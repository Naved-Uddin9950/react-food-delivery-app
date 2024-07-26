import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../../../features/cart/cartSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addOrder } from '../../../database/orderService';

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
            // Simulate a successful payment
            toast.success('Payment Successful!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

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
            toast.error('Error processing payment:', error.message);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validateForm();

        if (isValid) {
            handlePayment(); // Call the payment function
        }
    };

    const validateForm = () => {
        const { name, email, address, city, state, zip } = formData;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!name) {
            toast.error('Name is required');
            return false;
        }

        if (name.length < 2 || !/^[A-Za-z]+$/.test(name)) {
            toast.error('Invalid name. It should be at least 2 letters long and only contain alphabets.');
            return false;
        }

        if (!email) {
            toast.error('Email is required');
            return false;
        }

        if (!emailRegex.test(email)) {
            toast.error('Invalid email address.');
            return false;
        }

        if (!address) {
            toast.error('Address is required');
            return false;
        }

        if (!city) {
            toast.error('City is required');
            return false;
        }

        if (!state) {
            toast.error('State is required');
            return false;
        }

        if (!zip) {
            toast.error('Zip/Postal Code is required');
            return false;
        }

        return true;
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-8 dark:text-white">
            <ToastContainer />
            <h1 className="text-4xl font-bold mb-8">Checkout</h1>
            {
                totalAmount <= 0 ?
                    <div>Your Cart is empty. Please order something to make Payment</div> :
                    <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-6 bg-white rounded-lg p-8 shadow-lg dark:bg-gray-700">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Full Name
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
                                Email
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
                                Address
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
                                    City
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
                                    State
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
                                    Zip Code
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
                                Total Amount
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
                                Complete Payment
                            </button>
                        </div>
                    </form>
            }
        </div>
    );
};

export default Checkout;
