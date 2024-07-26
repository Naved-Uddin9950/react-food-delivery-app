import React from 'react';
import { Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

function DashboardHome() {
  return (
    <div className=''>
      <Breadcrumb
        items={[
          {
            href: '/dashboard',
            title: <HomeOutlined className='dark:text-white' />,
          },
          {
            title: <span className='dark:text-white'>Dashboard</span>,
          },
        ]}
        className="mb-4 text-lg dark:text-white"
      />

      <div>
        Dashboard Home
      </div>
    </div>
  )
}

export default DashboardHome