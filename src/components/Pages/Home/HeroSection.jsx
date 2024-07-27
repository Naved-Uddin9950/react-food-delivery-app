import React from 'react';
import { Carousel, Button, Typography } from 'antd';
import { useTranslate } from 'react-translate';

const { Title, Paragraph } = Typography;

const HeroSection = () => {

    let lang = useTranslate("Home");
    return (
        <div className="relative h-max mb-4">
            <Carousel autoplay className="h-full max-h-[70vh]">
                <div className="relative h-full max-h-[70vh]">
                    <img
                        // src="https://placehold.co/1200x600/crimson/white?text=Image+1"
                        src="https://img.freepik.com/free-photo/close-up-delicious-burger-meal_23-2151434076.jpg?t=st=1721996510~exp=1722000110~hmac=833fa91faaf7186026f2b9caa654c2cade326d04493f20c5729fde5e88856c05&w=740"
                        alt="Hero 1"
                        className="object-cover w-full h-full max-h-[70vh]"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                        <div className="text-center text-white">
                            {/* <Title level={1} className="text-4xl text-white">Welcome to Our Store {lang("HELLO")}</Title> */}
                            <Title level={1} className="text-4xl text-white">Welcome to Our Store {lang("HELLO")}</Title>
                            <Paragraph className="text-lg mt-2">Discover the best products at unbeatable prices.</Paragraph>
                            <Button type="primary" size="large" className="mt-4">Shop Now</Button>
                        </div>
                    </div>
                </div>
                <div className="relative h-full">
                    <img
                        src="https://img.freepik.com/free-photo/top-view-fast-food-mix-mozzarella-sticks-club-sandwich-hamburger-mushroom-pizza-caesar-shrimp-salad-french-fries-ketchup-mayo-cheese-sauces-table_141793-3998.jpg?t=st=1721997078~exp=1722000678~hmac=c72887f2067d1a1b9dd6dd6c0c445a71e44ac705026d306f389f3a690a5e8524&w=740"
                        alt="Hero 2"
                        className="object-cover w-full h-full max-h-[70vh]"
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
