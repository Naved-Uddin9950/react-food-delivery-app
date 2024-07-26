import { db } from "../firebaseConfig.js";
import { collection, addDoc, getDoc, doc } from 'firebase/firestore';

const testFirestore = async () => {
  try {
    const testCollection = collection(db, 'test');

    const docRef = await addDoc(testCollection, { testField: 'testValue' });
    console.log('Document written with ID: ', docRef.id);

    const docSnap = await getDoc(doc(db, 'test', docRef.id));

    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data());
    } else {
      console.log('No such document!');
    }
  } catch (error) {
    console.error('Error testing Firestore:', error);
  }
};

testFirestore();