import React from 'react';

const About = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-8 dark:text-white">
            <h1 className="text-4xl font-bold mb-8">About Us</h1>
            <div className="max-w-2xl text-center space-y-6">
                <p>
                    Welcome to Tandoori Pizza! We are passionate about bringing you the most delicious and authentic pizzas with a unique twist. Our team is dedicated to using the freshest ingredients and traditional recipes to create mouth-watering pizzas that you will love.
                </p>
                <p>
                    Our story began with a love for both traditional Italian pizza and the rich flavors of Tandoori cuisine. We decided to blend these two culinary worlds to create something truly special. Our pizzas are made with care, combining the best of both worlds to deliver a unique dining experience.
                </p>
                <p>
                    At Tandoori Pizza, we believe in quality and customer satisfaction. Our chefs are trained to maintain the highest standards of food preparation and hygiene. We are committed to providing you with a memorable dining experience, whether you choose to dine in, take out, or have our delicious pizzas delivered to your doorstep.
                </p>
                <p>
                    Thank you for choosing Tandoori Pizza. We hope you enjoy our pizzas as much as we enjoy making them for you!
                </p>
                <p>
                    If you have any questions or feedback, please do not hesitate to contact us. We are always here to serve you and improve our services.
                </p>
            </div>
        </div>
    );
};

export default About;
