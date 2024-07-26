import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import React from 'react';

function Loader() {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="text-center">
                <Spin
                    size="large"
                    indicator={<LoadingOutlined style={{ fontSize: 40 }} spin />}
                />
                <p className="mt-2 text-lg text-black dark:text-white font-semibold">Loading...</p>
            </div>
        </div>
    )
}

export default Loader;