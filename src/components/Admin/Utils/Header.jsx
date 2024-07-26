import React from 'react';
import { Dropdown, Menu, Button, Avatar } from 'antd';
import { BellOutlined, UserOutlined, MenuOutlined } from '@ant-design/icons';
import DarkMode from './DarkMode';
import logo from '/images/pizza.svg';

const Header = () => {

    const menu = (
        <Menu>
            <Menu.Item key="0">
                <a href="#">Profile</a>
            </Menu.Item>
            <Menu.Item key="1">
                <a href="#">Settings</a>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="2">
                <a href="#">Logout</a>
            </Menu.Item>
        </Menu>
    );

    return (
        <header className="bg-[#87ceea] dark:bg-[#333333] shadow-dark p-4 flex items-center justify-between">
            <div className="flex items-center">
                <img src={logo} alt="Logo" className="h-10 w-10 mr-3" />
            </div>
            <div className="flex items-center space-x-4">
                <div className={`flex items-center space-x-4`}>
                    <DarkMode />
                    <Button type="text" icon={<BellOutlined />} className="relative dark:text-white">
                        <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-600 rounded-full"></span>
                    </Button>
                    <Dropdown overlay={menu} trigger={['click']} placement="bottomRight" className='dark:text-white'>
                        <Button type="text" className="flex items-center">
                            <Avatar icon={<UserOutlined />} className='text-white bg-blue-500' />
                            <span className="ml-2 hidden md:inline dark:text-white">Admin</span>
                            <MenuOutlined />
                        </Button>
                    </Dropdown>
                </div>
            </div>
        </header>
    );
};

export default Header;
