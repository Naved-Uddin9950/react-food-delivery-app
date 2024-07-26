import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
    HomeOutlined, 
    CloseOutlined, 
    MenuOutlined, 
    ShoppingCartOutlined, 
    ShopOutlined, 
    AppstoreAddOutlined  
} from '@ant-design/icons';

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className={`flex flex-col h-screen p-3 bg-[#87ceea] dark:bg-[#333333] shadow-dark ${isCollapsed ? 'w-20' : 'w-64'} transition-width duration-300`}>
            <div className="flex items-center justify-between">
                <button onClick={() => setIsCollapsed(!isCollapsed)} className="text-xl">
                    {isCollapsed ? <MenuOutlined /> : <CloseOutlined />}
                </button>
            </div>
            <nav className="mt-5">
                <ul>
                    <li className="my-2">
                        <NavLink 
                            to="/dashboard/home" 
                            className={({ isActive }) => `flex items-center p-2 rounded ${isActive ? 'bg-blue-500' : 'hover:bg-gray-700'}`
                        }>
                            <HomeOutlined />
                            <span className={`ml-2 ${isCollapsed ? 'hidden' : 'block'}`}>Dashboard</span>
                        </NavLink>
                    </li>

                    <li className="my-2">
                        <NavLink 
                            to="/dashboard/products" 
                            className={({ isActive }) => `flex items-center p-2 rounded ${isActive ? 'bg-blue-500' : 'hover:bg-gray-700'}`
                        }>
                            <ShopOutlined />
                            <span className={`ml-2 ${isCollapsed ? 'hidden' : 'block'}`}>Products</span>
                        </NavLink>
                    </li>

                    <li className="my-2">
                        <NavLink 
                            to="/dashboard/orders" 
                            className={({ isActive }) => `flex items-center p-2 rounded ${isActive ? 'bg-blue-500' : 'hover:bg-gray-700'}`
                        }>
                            <ShoppingCartOutlined />
                            <span className={`ml-2 ${isCollapsed ? 'hidden' : 'block'}`}>Orders</span>
                        </NavLink>
                    </li>

                    <li className="my-2">
                        <NavLink 
                            to="/dashboard/categories" 
                            className={({ isActive }) => `flex items-center p-2 rounded ${isActive ? 'bg-blue-500' : 'hover:bg-gray-700'}`
                        }>
                            <AppstoreAddOutlined  />
                            <span className={`ml-2 ${isCollapsed ? 'hidden' : 'block'}`}>Categories</span>
                        </NavLink>
                    </li>
                    {/* <!-- Add more menu items here --> */}
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
