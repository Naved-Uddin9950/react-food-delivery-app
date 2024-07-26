import React from 'react';
import { Card, Typography } from 'antd';
import { StarFilled } from '@ant-design/icons';

const { Title } = Typography;

const formatTags = (tags) => {
    if (!tags) return 'N/A';
    if (typeof tags === 'string') {
        return tags.split(',').map(tag => tag.trim()).join(', ');
    }
    return tags.join(', ');
};

function ProductSection({
    title,
    products,
    cartHandler,
    cartItems
}) {

    const activeProducts = products.filter((item) => { return item.status === 'Active' });
    const limitedProducts = activeProducts.length >= 5 ? activeProducts.slice(0, 5) : activeProducts;

    if (!products || !activeProducts) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div className='mb-12'>
            <Title level={3} className='text-black dark:text-white'>{title}</Title>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {limitedProducts.length > 0 ? limitedProducts.map(product => {

                    const price = parseFloat(product.price);
                    const formattedPrice = isNaN(price) ? 'N/A' : price.toFixed(2);

                    const currentQuantity = cartItems.find(cartItem => cartItem.id === product.id)?.quantity || 0;

                    return (
                        <Card
                            hoverable
                            style={{
                                transition: 'transform 0.3s ease',
                                transform: 'scale(100%)',
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(105%)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(100%)'}
                            key={product.id}
                            title={product.name}
                            cover={<img alt={product.name} src={product.thumbnail || 'https://placehold.co/600x400/crimson/white?text=Image'} className="object-cover w-full h-40" />}
                            actions={[
                                <div className='flex flex-row justify-center items-center w-full'>
                                    <span className="flex h-max- w-max px-2 py-1 gap-2 bg-green-500 rounded">
                                        <StarFilled className='text-yellow-500' />
                                        4.2
                                    </span>
                                </div>,
                                <div className='w-full flex flex-row justify-center items-center'>
                                    <input
                                        type="number"
                                        min="0"
                                        placeholder="0"
                                        className="w-20 px-2 py-1 rounded text-black border"
                                        value={currentQuantity}
                                        onChange={(e) => cartHandler(product.id, product.name, product.description, product.price, product.thumbnail, e.target.value)}
                                    />
                                </div>,
                            ]}
                            className="shadow-dark rounded-xl hover:shadow-dark"
                        >
                            <p className='font-semibold'>Price: ${formattedPrice}</p>
                            <p className='flex flex-row justify-start items-center w-full mt-1 font-semibold'>
                                {formatTags(product.tags) === 'Vegetarian' && (
                                    <span className='bg-green-500 text-white px-2 py-1 rounded'>{formatTags(product.tags)}</span>
                                )}
                                {formatTags(product.tags) === 'Non-Vegetarian' && (
                                    <span className='bg-red-500 text-white px-2 py-1 rounded'>{formatTags(product.tags)}</span>
                                )}
                                {formatTags(product.tags) === 'Vegan' && (
                                    <span className='bg-teal-500 text-white px-2 py-1 rounded'>{formatTags(product.tags)}</span>
                                )}
                                {formatTags(product.tags) !== 'Vegetarian' && formatTags(product.tags) !== 'Non-Vegetarian' && formatTags(product.tags) !== 'Vegan' && (
                                    <span>{formatTags(product.tags)}</span>
                                )}
                            </p>
                        </Card>
                    );
                }) : (
                    <p className='text-black dark:text-white'>No {title} available</p>
                )}
            </div>
        </div>
    )
}

export default ProductSection