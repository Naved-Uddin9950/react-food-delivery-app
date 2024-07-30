import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import useTheme from '../../contexts/ThemeContext';
import Cart from './Cart';
import { auth } from '../../firebaseConfig';
import { signOut } from 'firebase/auth';
import { useAuth } from '../../hooks/useAuth';
import { notify } from './Notify';
import { useTranslation } from 'react-i18next';
import Search from './Search';

const Header = () => {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const toggleDarkMode = () => {
    setTheme(!theme);
    document.documentElement.classList.toggle('dark', !theme);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const toggleLanguageMenu = () => {
    setIsLanguageMenuOpen(!isLanguageMenuOpen);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      notify('success', t('notify.logout_success'));
    } catch (error) {
      notify('error', t('notify.logout_error'));
      console.error('Error signing out:', error);
    }
  };

  const handleChangeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setIsLanguageMenuOpen(false); // Close menu after selection
  };

  return (
    <>
      <header className="flex flex-col md:flex-row justify-between items-center w-full h-max py-4 px-4 lg:px-20 xg:px-36 shadow-dark gap-4 bg-[#87ceea] dark:bg-[#333333] dark:text-white">
        <div className="flex justify-between items-center w-full md:w-auto">
          <div className="text-xl md:text-2xl lg:text-3xl font-bold text-red-800 dark:text-red-500">
            {import.meta.env.VITE_APP_NAME}
          </div>
          <div className="md:hidden flex items-center gap-2">
            <div className="h-max w-full md:w-auto flex flex-row gap-4 justify-center items-center mx-12">
              <i className="fa-solid fa-cart-shopping cursor-pointer hover:text-blue-500" onClick={toggleCart}></i>
              <i className="fa-solid fa-moon cursor-pointer" id="theme-switch" onClick={toggleDarkMode}></i>
              <i className="fa-solid fa-globe cursor-pointer" onClick={toggleLanguageMenu}></i>
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
            {t('Header.home')}
          </NavLink>

          <NavLink
            to="/menu"
            className={({ isActive }) =>
              isActive
                ? 'border-b-2 border-black font-semibold text-sm md:text-base lg:text-lg'
                : 'hover:text-blue-500 hover:border-b-2 hover:border-blue-500 font-semibold text-sm md:text-base lg:text-lg'
            }
          >
            {t('Header.menu')}
          </NavLink>

          <NavLink
            to="/location"
            className={({ isActive }) =>
              isActive
                ? 'border-b-2 border-black font-semibold text-sm md:text-base lg:text-lg'
                : 'hover:text-blue-500 hover:border-b-2 hover:border-blue-500 font-semibold text-sm md:text-base lg:text-lg'
            }
          >
            {t('Header.location')}
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? 'border-b-2 border-black font-semibold text-sm md:text-base lg:text-lg'
                : 'hover:text-blue-500 hover:border-b-2 hover:border-blue-500 font-semibold text-sm md:text-base lg:text-lg'
            }
          >
            {t('Header.contact')}
          </NavLink>

          <div className='block w-full md:hidden'>
            <Search />
          </div>

          <div className="flex md:hidden flex-row justify-center items-center gap-4">
            {
              user === null && <button
                type="button"
                className="rounded-2xl py-1 px-3 font-semibold shadow-dark bg-blue-500 hover:bg-blue-600"
              >
                <Link to="/login">
                  {t('Header.login')}
                </Link>
              </button>
            }
            {
              user !== null &&
              <button onClick={handleSignOut} className='rounded-2xl py-1 px-3 font-semibold shadow-dark bg-red-500 hover:bg-red-600'>
                {t('Header.sign_out')}
              </button>
            }
          </div>
        </div>

        <div className="hidden md:flex flex-row justify-center items-center gap-4">
          <Search />
          <i className="fa-solid fa-cart-shopping cursor-pointer hover:text-blue-500" onClick={toggleCart}></i>
          <i className="fa-solid fa-moon cursor-pointer" id="theme-switch" onClick={toggleDarkMode}></i>
          <div className="relative">
            <i className="fa-solid fa-globe cursor-pointer" onClick={toggleLanguageMenu}></i>
            {isLanguageMenuOpen && (
              <ul className="absolute right-0 top-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg w-32 z-10">
                <li>
                  <button onClick={() => handleChangeLanguage('en')} className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                    English
                  </button>
                </li>
                <li>
                  <button onClick={() => handleChangeLanguage('es')} className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                    Español
                  </button>
                </li>
                <li>
                  <button onClick={() => handleChangeLanguage('jp')} className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                    日本語
                  </button>
                </li>
                {/* Add more languages as needed */}
              </ul>
            )}
          </div>
          {
            user === null && <button
              type="button"
              className="rounded-2xl py-1 px-3 font-semibold shadow-dark bg-blue-500 hover:bg-blue-600"
            >
              <Link to="/login">
                {t('Header.login')}
              </Link>
            </button>
          }
          {
            user !== null &&
            <button onClick={handleSignOut} className='rounded-2xl py-1 px-3 font-semibold shadow-dark bg-red-500 hover:bg-red-600'>
              {t('Header.sign_out')}
            </button>
          }
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
