import React from 'react';
import { Carousel, Button, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const HeroSection = () => {
    return (
        <div className="relative h-max mb-4">
            <Carousel autoplay className="h-full">
                <div className="relative h-full">
                    <img
                        src="https://placehold.co/1200x600/crimson/white?text=Image+1"
                        alt="Hero 1"
                        className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                        <div className="text-center text-white">
                            <Title level={1} className="text-4xl">Welcome to Our Store</Title>
                            <Paragraph className="text-lg mt-2">Discover the best products at unbeatable prices.</Paragraph>
                            <Button type="primary" size="large" className="mt-4">Shop Now</Button>
                        </div>
                    </div>
                </div>
                <div className="relative h-full">
                    <img
                        src="https://placehold.co/1200x600/007bff/ffffff?text=Image+2"
                        alt="Hero 2"
                        className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                        <div className="text-center text-white">
                            <Title level={1} className="text-4xl">Amazing Deals Await</Title>
                            <Paragraph className="text-lg mt-2">Find your favorite products at great discounts.</Paragraph>
                            <Button type="primary" size="large" className="mt-4">Explore Now</Button>
                        </div>
                    </div>
                </div>
            </Carousel>
        </div>
    );
};

export default HeroSection;
