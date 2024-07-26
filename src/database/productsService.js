import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export const addProduct = async (product) => {
  try {
    const productsCollection = collection(db, 'products');
    const docRef = await addDoc(productsCollection, product);
    return docRef;
  } catch (error) {
    console.error('Error adding products document: ', error);
    throw error;
  }
};
