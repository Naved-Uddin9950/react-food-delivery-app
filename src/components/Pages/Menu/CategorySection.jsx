import React from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';

function CategorySection({
    id,
    title,
    description,
    image
}) {
    return (
        <Link to={`/category/${id}`}>
            <div className='shadow-dark rounded-xl h-full'>
                <Card
                    hoverable
                    style={{
                        transition: 'transform 0.3s ease',
                        transform: 'scale(100%)',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(105%)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(100%)'}
                    title={title}
                    cover={<img alt={title} src={image || 'https://placehold.co/600x400/crimson/white?text=Image'} className="object-cover w-full h-40" />}
                    className="hover:shadow-dark h-full"
                >
                    <p className='font-semibold'>{description}</p>
                </Card>
            </div>
        </Link>
    )
}

export default CategorySection