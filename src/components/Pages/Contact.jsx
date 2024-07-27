import React, { useState } from 'react';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const notify = (type, message) => {
    toast[type](message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  }

  const formHandler = async (e) => {
    e.preventDefault();

    if (!name) {
      notify('error', 'Name is required!');
      return;
    }

    const namePattern = /^[A-Za-z]+( [A-Za-z]+)*$/;
    if (!namePattern.test(name)) {
      notify('error', 'Name must be at least 2 letters long and contain only alphabetical characters!');
      return;
    }

    if (!email) {
      notify('error', 'Email is required!');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      notify('error', 'Invalid email format!');
      return;
    }

    if (!message) {
      notify('error', 'Message is required!');
      return;
    }

    notify('warning', 'Form Sending...');

    const formData = new FormData(e.target);
    const EMAIL_ADDRESS = import.meta.env.VITE_EMAIL_ADDRESS;

    const response = await fetch(`https://formsubmit.co/${EMAIL_ADDRESS}`, {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      notify('success', 'Message sent successfully!');
    } else {
      notify('error', 'Error sending message.');
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-dark dark:bg-gray-700">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">Contact Us</h2>
        <form className="space-y-6" onSubmit={formHandler}>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="w-full px-3 py-2 border rounded dark:bg-gray-600 dark:text-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full px-3 py-2 border rounded dark:bg-gray-600 dark:text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              className="w-full px-3 py-2 border rounded dark:bg-gray-600 dark:text-white"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Contact;
