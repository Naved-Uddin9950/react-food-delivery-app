// import React, { useState, useEffect } from 'react';
// import { Typography, Card, Rate, Spin } from 'antd';
// import { collection, query, where, getDocs } from 'firebase/firestore';
// import { db } from '../../../firebaseConfig';

// const { Title, Paragraph } = Typography;

// const Reviews = ({ productId }) => {
//     const [reviews, setReviews] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchReviews = async () => {
//             try {
//                 const reviewsCollection = collection(db, 'reviews');
//                 const q = query(reviewsCollection, where('productId', '==', productId));
//                 const reviewSnapshot = await getDocs(q);
//                 const reviewList = reviewSnapshot.docs.map(doc => ({
//                     id: doc.id,
//                     ...doc.data(),
//                 }));
//                 setReviews(reviewList);
//             } catch (error) {
//                 console.error('Error fetching reviews:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchReviews();
//     }, [productId]);

//     if (loading) {
//         return (
//             <div className="flex justify-center items-center h-screen">
//                 <Spin size="large" />
//             </div>
//         );
//     }

//     return (
//         <div className="mt-12">
//             <Title level={3}>Customer Reviews</Title>
//             {reviews.length > 0 ? (
//                 reviews.map(review => (
//                     <Card key={review.id} className="mb-4">
//                         <Title level={4}>{review.title}</Title>
//                         <Rate disabled value={review.rating} />
//                         <Paragraph>{review.comment}</Paragraph>
//                     </Card>
//                 ))
//             ) : (
//                 <Paragraph>No reviews available for this product.</Paragraph>
//             )}
//         </div>
//     );
// };

// export default Reviews;
