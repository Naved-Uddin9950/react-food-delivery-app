import React from 'react';

function Location() {
  return (
    <div className="py-8 px-2 sm:px-6 md:px-20 lg:px-36">
      <h2 className="text-3xl font-bold text-center mb-8 dark:text-white">Location</h2>

      {/* Placeholder for Google Map */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 dark:text-white">Our Location</h3>
        {/* Replace with your Google Maps embed code or integration */}
        <div className="rounded-lg overflow-hidden shadow-dark">
          {/* Replace with your Google Maps iframe or other map component */}
          <iframe
            className="w-full h-96"
            title="Business Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3557.594998648461!2d75.83108872429118!3d26.916345659936503!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db6c97ba16a61%3A0x2a0580335f350da8!2sGhat%20Gate%2C%20Ghat%20Gate%20Bazar%2C%20Pink%20City%2C%20Jaipur%2C%20Rajasthan%20302007!5e0!3m2!1sen!2sin!4v1721115989435!5m2!1sen!2sin"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>

      {/* Other Location Details */}
      <div className="text-lg leading-relaxed dark:text-gray-300">
        <p className="mb-4">
          Address: 123 Main Street, Cityville, State, Country, Zip Code
        </p>
        <p className="mb-4">
          Contact: Phone: +1 123-456-7890 | Email: info@example.com
        </p>
        <p className="mb-4">
          Hours of Operation: Monday to Friday: 9:00 AM - 6:00 PM
        </p>
      </div>
    </div>
  );
}

export default Location;
