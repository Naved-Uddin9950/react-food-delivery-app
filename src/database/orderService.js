import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export const addOrder = async (order) => {
  try {
    const ordersCollection = collection(db, 'orders');
    const docRef = await addDoc(ordersCollection, order);
    return docRef;
  } catch (error) {
    console.error('Error adding orders document: ', error);
    throw error;
  }
};
