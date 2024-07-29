import React, { useEffect, useState, useTransition } from 'react';
import { Navigate, NavLink } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { provider, auth } from '../../../firebaseConfig';
import { signInWithPopup, signOut, signInWithEmailAndPassword } from 'firebase/auth';
import { notify } from '../../Utils/Notify';
import google from '/images/google.svg';
import { useAuth } from '../../../hooks/useAuth';
import { useTranslation } from 'react-i18next';

const Login = () => {
    const { user } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if (user) {
            const timer = setTimeout(() => {
                setRedirect(true);
            }, 3000); // 3-second delay

            return () => clearTimeout(timer); // Clean up the timeout if the component unmounts
        }
    }, [user]);

    if (redirect) {
        return <Navigate to="/" />;
    }

    const handleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            notify('success', t('notify.login_success'));
        } catch (error) {
            notify('error', t('notify.login_error'));
            console.error('Error signing in:', error);
        }
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

    const formHandler = async (e) => {
        e.preventDefault();

        try {
            await signInWithEmailAndPassword(auth, email, password);
            notify('success', t('notify.login_success'));
            setEmail('');
            setPassword('');
        } catch (error) {
            notify('error', error.message);
            console.error('Error login user:', error);
        }
    };

    const { t } = useTranslation();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-dark dark:bg-gray-700">
                <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
                    {user ? t('Login.haveAccount') : t('Login.login')}
                </h2>
                {!user && (
                    <form className="space-y-6" onSubmit={formHandler}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="email">
                                {t('Signup.email')}
                            </label>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-3 py-2 border rounded dark:bg-gray-600 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="password">
                                {t('Signup.password')}
                            </label>
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-3 py-2 border rounded dark:bg-gray-600 dark:text-white"
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
                            >
                                {t('Login.login')}
                            </button>
                        </div>
                    </form>
                )}
                <div className='flex flex-row justify-center items-center gap-2'>
                    {user ? (
                        <button onClick={handleSignOut} className='w-full px-4 py-2 font-semibold text-white bg-red-500 rounded hover:bg-red-600'>
                            {t('Login.logout')}
                        </button>
                    ) : (
                        <button onClick={handleSignIn} className='w-full px-4 py-2 font-semibold text-white bg-blue-700 rounded hover:bg-blue-800 flex flex-row justify-center items-center gap-2 mt-[-1rem]'>
                            {t('Login.google')} <img src={google} alt="google" className='h-6' />
                        </button>
                    )}
                </div>
                {!user && (
                    <div className="text-sm text-center text-gray-600 dark:text-gray-300">
                        {t('Login.noAccount')}{' '}
                        <NavLink to="/signup" className="text-blue-500 hover:text-blue-600">
                            {t('Signup.signup')}
                        </NavLink>
                    </div>
                )}
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;
