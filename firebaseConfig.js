import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAIjfG4NocFfM1y1gdXZwMB45UH0nCFkpc',
  authDomain: 'todo-app-744f8.firebaseapp.com',
  projectId: 'todo-app-744f8',
  storageBucket: 'todo-app-744f8.appspot.com',
  messagingSenderId: '430817003010',
  appId: '1:430817003010:web:d2425a210e9f24e3c6891b',
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
