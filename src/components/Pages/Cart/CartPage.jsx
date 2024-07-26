import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, setQuantity } from '../../../features/cart/cartSlice';
import { Link } from 'react-router-dom';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart); // Access cart array correctly
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  // Handle Dispatch
  const cartHandler = (id, name, description, price, image, quantity) => {
    if (quantity > 0) {
      dispatch(setQuantity({ id, quantity: parseInt(quantity, 10) }));
    } else {
      dispatch(removeFromCart(id));
    }
  };

  const totalAmount = cartItems ? cartItems.reduce((total, item) => total + item.price * item.quantity, 0) : 0;

  return (
    <div className="py-8 md:px-20 lg:px-36">
      <h2 className="text-3xl font-bold text-center mb-8 dark:text-white">Cart</h2>
      {cartItems.length === 0 ? (
        <div className='flex flex-col justify-center items-center gap-4'>
          <p className="text-center dark:text-gray-300">Your cart is empty.</p>
          <button className="self-center mt-4 px-8 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">
            <Link to="/menu">
              Shopping
            </Link>
          </button>
        </div>
      ) : (
        <div className="w-full flex flex-col gap-4">
          {cartItems.map((item) => (
            <div key={item.id} className="w-full flex flex-row justify-between items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <div className="flex flex-row items-center gap-4">
                {/* <img src={item.image} alt={item.name} className="w-16 h-16 rounded-full" /> */}
                {<img alt={item.name} src={item.image || 'https://placehold.co/600x400/crimson/white?text=Image'} className="object-cover rounded-full w-16 h-16" />}
                <div>
                  <h3 className="font-semibold text-lg dark:text-white">{item.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400">${isNaN(item.price) ? 'N/A' : parseFloat(item.price).toFixed(2)}</p>
                </div>
              </div>
              <div className="flex flex-row items-center gap-4">
                <input
                  type="number"
                  min="1"
                  value={isNaN(item.quantity) ? 'N/A' : item.quantity}
                  className="w-16 px-2 py-1 rounded text-black"
                  onChange={(e) => cartHandler(item.id, item.name, item.description, item.price, item.image, e.target.value)}
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
          <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg dark:text-white">Total</h3>
            <h3 className="font-semibold text-lg dark:text-white">${totalAmount.toFixed(2)}</h3>
          </div>
          <button className="self-center mt-4 px-8 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">
            <Link to="/checkout">
              Checkout
            </Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
