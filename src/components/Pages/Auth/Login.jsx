import React, { useEffect, useState } from 'react';
import { Navigate, NavLink } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { provider, auth } from '../../../firebaseConfig';
import { signInWithPopup, signOut, signInWithEmailAndPassword } from 'firebase/auth';
import { notify } from '../../Utils/Notify';
import google from '/images/google.svg';
import { useAuth } from '../../../hooks/useAuth';

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
            notify('success', 'Signed in successfully');
        } catch (error) {
            notify('error', 'Error signing in');
            console.error('Error signing in:', error);
        }
    };

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            notify('success', 'Signed out successfully');
        } catch (error) {
            notify('error', 'Error signing out');
            console.error('Error signing out:', error);
        }
    };

    const formHandler = async (e) => {
        e.preventDefault();

        try {
            await signInWithEmailAndPassword(auth, email, password);
            notify('success', 'Login successfully');
            setEmail('');
            setPassword('');
        } catch (error) {
            notify('error', error.message);
            console.error('Error login user:', error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-dark dark:bg-gray-700">
                <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
                    {user ? 'You are already signed in, want to Log Out?' : 'Log In'}
                </h2>
                {!user && (
                    <form className="space-y-6" onSubmit={formHandler}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="email">
                                Email
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
                                Password
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
                                Log In
                            </button>
                        </div>
                    </form>
                )}
                <div className='flex flex-row justify-center items-center gap-2'>
                    {user ? (
                        <button onClick={handleSignOut} className='w-full px-4 py-2 font-semibold text-white bg-red-500 rounded hover:bg-red-600'>
                            Sign Out
                        </button>
                    ) : (
                        <button onClick={handleSignIn} className='w-full px-4 py-2 font-semibold text-white bg-blue-700 rounded hover:bg-blue-800 flex flex-row justify-center items-center gap-2 mt-[-1rem]'>
                            Sign In with Google <img src={google} alt="google" className='h-6' />
                        </button>
                    )}
                </div>
                {!user && (
                    <div className="text-sm text-center text-gray-600 dark:text-gray-300">
                        Don't have an account?{' '}
                        <NavLink to="/signup" className="text-blue-500 hover:text-blue-600">
                            Sign Up
                        </NavLink>
                    </div>
                )}
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;
