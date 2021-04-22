import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyANEUT9XlJcjVu7x-XejpqsMSGkVTZnLKU',
  authDomain: 'reventscourse-4a376.firebaseapp.com',
  projectId: 'reventscourse-4a376',
  storageBucket: 'reventscourse-4a376.appspot.com',
  messagingSenderId: '206302518318',
  appId: '1:206302518318:web:91d24be9569c336d6fd3bf',
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
