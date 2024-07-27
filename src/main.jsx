import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom";
import Home, { homeLoader } from './components/Pages/Home';
import Menu, { menuLoader } from './components/Pages/Menu';
import Location from './components/Pages/Location';
import Cart from './components/Pages/Cart/CartPage';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Signup from './components/Pages/Auth/Signup';
import Login from './components/Pages/Auth/Login';
import Contact from './components/Pages/Contact';
import About from './components/Pages/About';
import Delivery from './components/Pages/Delivery';
import PrivacyPolicy from './components/Pages/PrivacyPolicy';
import Checkout from './components/Pages/Wallet/Checkout';
import { Categories, Dashboard, DashboardHome, fetchCategories, fetchOrders, fetchProducts, Orders, Products } from './components/Admin/index';
import ProductDetails from './components/Pages/Product/ProductDetails';
import CategoryDetails from './components/Pages/Category/CategoryDetails';
import { TranslatorProvider, useTranslate } from "react-translate";
import { translations } from './language';
import { AuthRoute } from './components/AuthRoutes';

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
        <Route path='cart' element={<AuthRoute element={Cart} />} />
        <Route path='checkout' element={<AuthRoute element={Checkout} />} />
        <Route path='signup' element={<Signup />} />
        <Route path='login' element={<Login />} />

        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/category/:id" element={<CategoryDetails />} />

      </Route>

      {/* Admin routes */}
      <Route path='/dashboard' element={<Dashboard />}>
        <Route path='home' index element={<DashboardHome />} />
        <Route path='products' element={<Products />} loader={fetchProducts} />
        <Route path='orders' element={<Orders />} loader={fetchOrders} />
        <Route path='categories' element={<Categories />} loader={fetchCategories} />
      </Route>
    </>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <TranslatorProvider translations={translations}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </TranslatorProvider>
  </React.StrictMode>,
)
