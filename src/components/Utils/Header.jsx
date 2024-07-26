import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import useTheme from '../../contexts/ThemeContext';
import Cart from './Cart'; // Import the Cart component

const Header = () => {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false); // State for cart modal

  const toggleDarkMode = () => {
    setTheme(!theme);
    if (theme) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen); // Toggle cart modal visibility
  };

  return (
    <>
      <header className="flex flex-col md:flex-row justify-between items-center w-full h-max py-4 px-4 lg:px-20 xg:px-36 shadow-dark gap-4 bg-[#87ceea] dark:bg-[#333333] dark:text-white">
        <div className="flex justify-between items-center w-full md:w-auto">
          <div className="text-xl md:text-2xl lg:text-3xl font-bold text-red-800 dark:text-red-500">Tandoori Pizza</div>
          <div className="md:hidden flex items-center gap-2">
            <div className="h-max w-full md:w-auto flex flex-row gap-4 justify-center items-center mx-12">
              <i className="fa-solid fa-cart-shopping cursor-pointer hover:text-blue-500" onClick={toggleCart}></i>
              <i className="fa-solid fa-moon cursor-pointer" id="theme-switch" onClick={toggleDarkMode}></i>
              <i className="fa-solid fa-globe cursor-pointer"></i>
            </div>
            <button className="text-3xl" onClick={toggleMenu}>
              <i className="fa-solid fa-bars"></i>
            </button>
          </div>
        </div>

        <div className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 w-full md:w-auto`}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? 'border-b-2 border-black font-semibold text-sm md:text-base lg:text-lg'
                : 'hover:text-blue-500 hover:border-b-2 hover:border-blue-500 font-semibold text-sm md:text-base lg:text-lg'
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/menu"
            className={({ isActive }) =>
              isActive
                ? 'border-b-2 border-black font-semibold text-sm md:text-base lg:text-lg'
                : 'hover:text-blue-500 hover:border-b-2 hover:border-blue-500 font-semibold text-sm md:text-base lg:text-lg'
            }
          >
            Menu
          </NavLink>

          <NavLink
            to="/location"
            className={({ isActive }) =>
              isActive
                ? 'border-b-2 border-black font-semibold text-sm md:text-base lg:text-lg'
                : 'hover:text-blue-500 hover:border-b-2 hover:border-blue-500 font-semibold text-sm md:text-base lg:text-lg'
            }
          >
            Location
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? 'border-b-2 border-black font-semibold text-sm md:text-base lg:text-lg'
                : 'hover:text-blue-500 hover:border-b-2 hover:border-blue-500 font-semibold text-sm md:text-base lg:text-lg'
            }
          >
            Contact
          </NavLink>
          <div className="relative h-max w-full md:w-auto md:hidden">
            <label htmlFor="search" className="absolute top-1 left-1">
              <i className="fa-solid fa-magnifying-glass text-black"></i>
            </label>
            <input
              type="search"
              name="q"
              id="search"
              className="border rounded-xl shadow py-1 pl-6 w-full md:w-64 dark:text-black"
              placeholder="Onion Pizza"
            />
          </div>
          <div className="flex md:hidden flex-row justify-center items-center gap-4">
            <button
              type="button"
              className="border rounded-2xl py-1 px-3 font-semibold shadow hover:text-blue-500"
            >
              <Link to="/login">
                Login
              </Link>
            </button>
          </div>
        </div>

        <div className="hidden md:flex flex-row justify-center items-center gap-4">
          <div className="relative h-max w-full md:w-auto">
            <label htmlFor="search" className="absolute top-1 left-1">
              <i className="fa-solid fa-magnifying-glass text-black"></i>
            </label>
            <input
              type="search"
              name="q"
              id="search"
              className="border rounded-xl shadow py-1 pl-6 w-full md:w-40 dark:text-black"
              placeholder="Onion Pizza"
            />
          </div>
          <i className="fa-solid fa-cart-shopping cursor-pointer hover:text-blue-500" onClick={toggleCart}></i>
          <i className="fa-solid fa-moon cursor-pointer" id="theme-switch" onClick={toggleDarkMode}></i>
          <i className="fa-solid fa-globe cursor-pointer"></i>
          <button
            type="button"
            className="rounded-2xl py-1 px-3 font-semibold shadow-dark hover:text-blue-500"
          >
            <Link to="/login">
              Login
            </Link>
          </button>
        </div>
      </header>

      {isCartOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2">
            <Cart toggleCart={toggleCart} />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
