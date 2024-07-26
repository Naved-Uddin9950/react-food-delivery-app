import React, { useState } from 'react'
import Header from './components/Utils/Header';
import Footer from './components/Utils/Footer';
import { Outlet } from 'react-router-dom';

// CSS Files
import './App.css';

// Contexts
import { ThemeProvider } from './contexts/ThemeContext';

function App() {

  const [theme, setTheme] = useState();

  return (
    <div className='w-full h-full bg-[#87ceea] dark:bg-[#333333]'>
      <ThemeProvider value={{ theme, setTheme }}>
        <Header />
        <Outlet />
        <Footer />
      </ThemeProvider>
    </div>
  )
}

export default App
