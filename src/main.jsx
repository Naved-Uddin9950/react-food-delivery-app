import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom";
import Home, { homeLoader } from './components/Pages/Home.jsx';
import Menu, { menuLoader } from './components/Pages/Menu.jsx';
import Location from './components/Pages/Location.jsx';
import Cart from './components/Pages/Cart/CartPage.jsx';
import { Provider } from 'react-redux';
import { store } from './store/store.js';
import Signup from './components/Pages/Auth/Signup.jsx';
import Login from './components/Pages/Auth/Login.jsx';
import Contact from './components/Pages/Contact.jsx';
import About from './components/Pages/About.jsx';
import Delivery from './components/Pages/Delivery.jsx';
import PrivacyPolicy from './components/Pages/PrivacyPolicy.jsx';
import Checkout from './components/Pages/Wallet/Checkout.jsx';
import { Categories, Dashboard, DashboardHome, fetchCategories, fetchOrders, fetchProducts, Orders, Products } from './components/Admin/index.js';
import Test from './Testing/Test.jsx';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    const swUrl = `${import.meta.env.BASE_URL}sw.js`;
    navigator.serviceWorker
      .register(swUrl)
      .then((registration) => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch((error) => {
        console.log('Service Worker registration failed:', error);
      });
  });
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* User routes */}
      <Route path='/' element={<App />}>
        <Route path='' element={<Home />} loader={homeLoader} />
        <Route path='menu' element={<Menu />} loader={menuLoader} />
        <Route path='location' element={<Location />} />
        <Route path='contact' element={<Contact />} />
        <Route path='about' element={<About />} />
        <Route path='delivery' element={<Delivery />} />
        <Route path='privacy-policy' element={<PrivacyPolicy />} />
        <Route path='cart' element={<Cart />} />
        <Route path='checkout' element={<Checkout />} />
        <Route path='signup' element={<Signup />} />
        <Route path='login' element={<Login />} />
      </Route>

      {/* Admin routes */}
      <Route path='/dashboard' element={<Dashboard />}>
        <Route path='home' index element={<DashboardHome />} />
        <Route path='products' element={<Products />} loader={fetchProducts} />
        <Route path='orders' element={<Orders />} loader={fetchOrders} />
        <Route path='categories' element={<Categories />} loader={fetchCategories} />
      </Route>

      <Route path="/test" element={<Test />} />
    </>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
