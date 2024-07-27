import React, { useEffect, useState } from 'react';
import { Navigate, NavLink } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';
import { notify } from '../../Utils/Notify';
import { useAuth } from '../../../hooks/useAuth';
import google from '/images/google.svg';

const Signup = () => {
    const { user } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if (user) {
            const timer = setTimeout(() => {
                setRedirect(true);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [user]);

    if (redirect) {
        return <Navigate to="/" />;
    }

    const formHandler = async (e) => {
        e.preventDefault();

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            notify('success', 'User registered successfully');
            setEmail('');
            setPassword('');
        } catch (error) {
            notify('error', error.message);
            console.error('Error registering user:', error);
        }
    }

    const googleAuth = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            notify('success', 'Signed in successfully');
        } catch (error) {
            notify('error', 'Error signing in');
            console.error('Error signing in:', error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-dark dark:bg-gray-700">
                <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">Sign Up</h2>
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
                            Sign Up
                        </button>
                    </div>
                </form>

                <div className='flex flex-row justify-center items-center gap-2'>
                    <button onClick={googleAuth} className='w-full px-4 py-2 font-semibold text-white bg-blue-700 rounded hover:bg-blue-800 flex flex-row justify-center items-center gap-2 mt-[-1rem]'>
                        Sign In with Google <img src={google} alt="google" className='h-6' />
                    </button>
                </div>

                <div className="text-sm text-center text-gray-600 dark:text-gray-300">
                    Already have an account?{' '}
                    <NavLink to="/login" className="text-blue-500 hover:text-blue-600">
                        Log In
                    </NavLink>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Signup;
