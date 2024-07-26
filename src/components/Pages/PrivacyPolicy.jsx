import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-8 dark:text-white">
            <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
            <div className="max-w-3xl space-y-6">
                <p className="text-lg leading-relaxed">
                    At <span className="font-semibold">Tandoori Pizza</span>, we are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and safeguard your personal information when you use our website, mobile app, or services.
                </p>

                <h2 className="text-2xl font-bold mt-8">1. Information We Collect</h2>
                <p className="text-lg leading-relaxed">
                    We may collect the following types of information:
                </p>
                <ul className="list-disc list-inside text-left mx-auto space-y-2">
                    <li><span className="font-semibold">Personal Information:</span> Name, email address, phone number, delivery address, payment information.</li>
                    <li><span className="font-semibold">Usage Data:</span> IP address, browser type, operating system, pages visited, time spent on the site, and other related metrics.</li>
                </ul>

                <h2 className="text-2xl font-bold mt-8">2. How We Use Your Information</h2>
                <p className="text-lg leading-relaxed">
                    We use your information to:
                </p>
                <ul className="list-disc list-inside text-left mx-auto space-y-2">
                    <li>Process and deliver your orders.</li>
                    <li>Communicate with you regarding your orders and our services.</li>
                    <li>Improve our website, app, and services based on your feedback and usage patterns.</li>
                    <li>Send promotional emails, newsletters, and updates (you can opt out at any time).</li>
                </ul>

                <h2 className="text-2xl font-bold mt-8">3. Data Security</h2>
                <p className="text-lg leading-relaxed">
                    We implement a variety of security measures to ensure the safety of your personal information. Your personal data is stored in secured networks and is only accessible by a limited number of authorized personnel who have special access rights to such systems.
                </p>

                <h2 className="text-2xl font-bold mt-8">4. Sharing Your Information</h2>
                <p className="text-lg leading-relaxed">
                    We do not sell, trade, or otherwise transfer your personal information to outside parties, except as required by law or in the following circumstances:
                </p>
                <ul className="list-disc list-inside text-left mx-auto space-y-2">
                    <li>With trusted third parties who assist us in operating our website, app, and conducting our business, so long as those parties agree to keep this information confidential.</li>
                    <li>To comply with legal obligations, enforce our site policies, or protect our or others' rights, property, or safety.</li>
                </ul>

                <h2 className="text-2xl font-bold mt-8">5. Cookies</h2>
                <p className="text-lg leading-relaxed">
                    Our website uses cookies to enhance your browsing experience. Cookies are small files that a site or its service provider transfers to your computer's hard drive through your web browser that enables the site's or service provider's systems to recognize your browser and capture and remember certain information.
                </p>
                <p className="text-lg leading-relaxed">
                    You can choose to have your computer warn you each time a cookie is being sent, or you can choose to turn off all cookies via your browser settings. If you turn cookies off, some features will be disabled that make your site experience more efficient, and some of our services may not function properly.
                </p>

                <h2 className="text-2xl font-bold mt-8">6. Your Consent</h2>
                <p className="text-lg leading-relaxed">
                    By using our site or app, you consent to our privacy policy.
                </p>

                <h2 className="text-2xl font-bold mt-8">7. Changes to Our Privacy Policy</h2>
                <p className="text-lg leading-relaxed">
                    If we decide to change our privacy policy, we will post those changes on this page. Policy changes will apply only to information collected after the date of the change.
                </p>

                <h2 className="text-2xl font-bold mt-8">8. Contacting Us</h2>
                <p className="text-lg leading-relaxed">
                    If you have any questions regarding this privacy policy, you may contact us using the information below:
                </p>
                <p className="text-lg leading-relaxed">
                    <span className="font-semibold">Tandoori Pizza</span><br />
                    Email: <a href="mailto:naveduddin83@gmail.com" className="text-blue-500 hover:underline">naveduddin83@gmail.com</a><br />
                    Phone: <a href="tel:+911234567890" className="text-blue-500 hover:underline">+91 12345 67890</a>
                </p>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
