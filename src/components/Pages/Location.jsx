import React, { useState } from 'react';
import Loader from '../Utils/Loader';
import { useTranslation } from 'react-i18next';

function Location() {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="py-8 px-2 sm:px-6 md:px-20 lg:px-36">
      <h2 className="text-3xl font-bold text-center mb-8 dark:text-white">{t('Location.location')}</h2>
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 dark:text-white">{t('Location.heading')}</h3>
        <div className="relative rounded-lg overflow-hidden shadow-dark">
          {!iframeLoaded && (
            <div className="absolute inset-0 flex justify-center items-center bg-gray-200 dark:bg-gray-700">
              <span className="text-gray-500 dark:text-gray-300">{<Loader />}</span>
            </div>
          )}
          <iframe
            className={`w-full h-96 ${iframeLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
            title="Business Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3557.594998648461!2d75.83108872429118!3d26.916345659936503!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db6c97ba16a61%3A0x2a0580335f350da8!2sGhat%20Gate%2C%20Ghat%20Gate%20Bazar%2C%20Pink%20City%2C%20Jaipur%2C%20Rajasthan%20302007!5e0!3m2!1sen!2sin!4v1721115989435!5m2!1sen!2sin"
            allowFullScreen=""
            loading="lazy"
            onLoad={() => setIframeLoaded(true)}
          ></iframe>
        </div>
      </div>

      <div className="text-lg leading-relaxed dark:text-gray-300">
        <p className="mb-4">
          {t('Location.address')}: {t('Footer.address')}
        </p>
        <p className="mb-4">
          {t('Location.contact')}: {t('Location.phone')}: {t('Footer.phone')} | {t('Location.email')}: {t('Footer.email')}
        </p>
        <p className="mb-4">
          {t('Location.operation')}: {t('Location.hours')}
        </p>
      </div>
    </div>
  );
}

export default Location;
