import React, { useState } from 'react';
import Sidebar from '../Utils/Sidebar';
import Header from '../Utils/Header';
import { Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { ThemeProvider } from '../../../contexts/ThemeContext';
import { Outlet } from 'react-router-dom';

function Dashboard() {
    const [theme, setTheme] = useState();

    return (
        <ThemeProvider value={{ theme, setTheme }}>
            <div className="flex flex-col w-full h-full dark:bg-gray-800 dark:text-white">
                <Header />
                <div className="flex flex-1">
                    <Sidebar />
                    <div className="flex flex-col flex-1 p-10">
                        <Outlet />
                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
}

export default Dashboard;
