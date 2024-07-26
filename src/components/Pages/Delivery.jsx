import React from 'react';

const Delivery = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-8 dark:text-white">
            <h1 className="text-4xl font-bold mb-8">Delivery Information</h1>
            <div className="max-w-2xl text-center space-y-6">
                <p className="text-lg leading-relaxed">
                    At <span className="font-semibold">Tandoori Pizza</span>, we strive to bring our delicious pizzas right to your doorstep. Our delivery service ensures that you can enjoy our mouth-watering pizzas in the comfort of your own home.
                </p>
                <p className="text-lg leading-relaxed">
                    <span className="font-semibold">Delivery Hours:</span>
                </p>
                <ul className="list-disc list-inside text-left mx-auto space-y-2">
                    <li>Monday to Friday: 11:00 AM - 10:00 PM</li>
                    <li>Saturday and Sunday: 12:00 PM - 11:00 PM</li>
                </ul>
                <p className="text-lg leading-relaxed">
                    <span className="font-semibold">Delivery Areas:</span> We currently deliver to the following areas:
                </p>
                <ul className="list-disc list-inside text-left mx-auto space-y-2">
                    <li>Downtown</li>
                    <li>Suburbs</li>
                    <li>Nearby Towns</li>
                    <li>Additional areas upon request</li>
                </ul>
                <p className="text-lg leading-relaxed">
                    <span className="font-semibold">Delivery Charges:</span> Our delivery fee is based on your location and order size. Please check our website or call us for specific details.
                </p>
                <p className="text-lg leading-relaxed">
                    <span className="font-semibold">How to Order:</span> You can place your order through our website, mobile app, or by calling us directly. We recommend ordering online for the fastest service.
                </p>
                <p className="text-lg leading-relaxed">
                    Thank you for choosing <span className="font-semibold">Tandoori Pizza</span>. We look forward to serving you our delicious pizzas, wherever you are!
                </p>
            </div>
        </div>
    );
};

export default Delivery;
