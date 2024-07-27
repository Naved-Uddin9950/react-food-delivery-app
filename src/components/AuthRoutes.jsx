import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { notify } from './Utils/Notify';
import { ToastContainer } from 'react-toastify';

export const AuthRoute = ({ element: Element, ...rest }) => {
  const { user } = useAuth();
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!user) {
      notify('info', 'Redirecting to login page');
      const timer = setTimeout(() => setRedirect(true), 3000);
      return () => clearTimeout(timer);
    }
  }, [user]);

  if (redirect) {
    return <Navigate to="/login" />;
  }

  return user ?
    <Element {...rest} />
    :
    <>
      <div className='w-full h-screen flex justify-center items-center text-black dark:text-white font-bold text-2xl'>You need to login first
      </div>;
      <ToastContainer />
    </>
};