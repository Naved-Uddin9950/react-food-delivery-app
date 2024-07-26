import React from 'react';
import useTheme from '../../../contexts/ThemeContext';

function DarkMode() {

    const { theme, setTheme } = useTheme();

    const toggleDarkMode = () => {
        setTheme(!theme);
        if (theme) {
            document.documentElement.classList.remove('dark');
        } else {
            document.documentElement.classList.add('dark');
        }
    };

    return (
        <i className="fa-solid fa-moon cursor-pointer" id="theme-switch" onClick={toggleDarkMode}></i>
    )
}

export default DarkMode