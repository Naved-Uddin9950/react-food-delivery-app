import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Footer() {
    const { t } = useTranslation();

    return (
        <footer className='flex flex-col bg-[#333333] shadow-md py-8 px-4 sm:px-8 md:px-16 lg:px-32 dark:shadow-dark-t'>
            <div className='flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-8 md:pb-12'>
                <div className='flex flex-col gap-4 mb-8 md:mb-0'>
                    <h3 className='font-bold text-xl sm:text-2xl text-red-500'>{import.meta.env.VITE_APP_NAME}</h3>
                    <h5 className='text-base text-white'>{t('Footer.order_food')}</h5>
                    <div className='flex flex-row gap-4'>
                        {/* Facebook */}
                        <div className='w-10 h-10 sm:w-12 sm:h-12 shadow-dark rounded-full p-2 sm:p-4 flex justify-center items-center bg-blue-600 hover:bg-blue-700 cursor-pointer'>
                            <i className='fa-brands fa-facebook-f text-white'></i>
                        </div>

                        {/* Twitter */}
                        <div className='w-10 h-10 sm:w-12 sm:h-12 shadow-dark rounded-full p-2 sm:p-4 flex justify-center items-center bg-blue-600 hover:bg-blue-700 cursor-pointer'>
                            <i className='fa-brands fa-twitter text-white'></i>
                        </div>

                        {/* LinkedIn */}
                        <div className='w-10 h-10 sm:w-12 sm:h-12 shadow-dark rounded-full p-2 sm:p-4 flex justify-center items-center bg-blue-600 hover:bg-blue-700 cursor-pointer'>
                            <i className='fa-brands fa-linkedin-in text-white'></i>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col gap-2 sm:gap-4 text-white mb-8 md:mb-0'>
                    <h3 className='font-bold text-xl sm:text-2xl'>{t('Footer.company')}</h3>
                    <h4 className='border-b pb-1 sm:pb-2'>
                        <Link to="/">
                            {t('Footer.home')}
                        </Link>
                    </h4>
                    <h4 className='border-b pb-1 sm:pb-2'>
                        <Link to="/about">
                            {t('Footer.about_us')}
                        </Link>
                    </h4>
                    <h4 className='border-b pb-1 sm:pb-2'>
                        <Link to="delivery">
                            {t('Footer.delivery')}
                        </Link>
                    </h4>
                    <h4 className='border-b pb-1 sm:pb-2'>
                        <Link to="/privacy-policy">
                            {t('Footer.privacy_policy')}
                        </Link>
                    </h4>
                </div>

                <div className='flex flex-col gap-2 sm:gap-4 text-white'>
                    <h3 className='font-bold text-xl sm:text-2xl'>{t('Footer.get_in_touch')}</h3>
                    <h4 className='border-b pb-1 sm:pb-2'>{t('Footer.phone')}</h4>
                    <h4 className='border-b pb-1 sm:pb-2'>{t('Footer.email')}</h4>
                    <h4 className='border-b pb-1 sm:pb-2'>{t('Footer.address')}</h4>
                    <h4 className='border-b pb-1 sm:pb-2'>
                        <a href={import.meta.env.VITE_APP_URL} target="_blank" className='hover:text-blue-500'>{t('Footer.website')}</a>
                    </h4>
                </div>
            </div>

            <div className='flex flex-row justify-center items-center text-white pt-8 md:pt-12 text-sm sm:text-base'>
                {t('Footer.copyright', { url: import.meta.env.VITE_APP_URL })}
            </div>
        </footer>
    );
}

export default Footer;
