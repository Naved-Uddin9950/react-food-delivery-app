import React, { useEffect } from 'react';
import { db } from '../firebaseConfig';

const Test = () => {
  useEffect(() => {
    const testFirestore = async () => {
      try {
        const testCollection = db.collection('test');
        const docRef = await testCollection.add({ testField: 'testValue' });
        console.log('Document written with ID: ', docRef.id);

        const doc = await docRef.get();
        console.log('Document data:', doc.data());
      } catch (error) {
        console.error('Error testing Firestore:', error);
      }
    };

    testFirestore();
  }, []);

  return <div>Check your console for Firestore test results.</div>;
};

export default Test;
