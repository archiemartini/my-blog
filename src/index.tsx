import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyDeFcFb7EomGAvdra32I5529InAz5yE35s',
  authDomain: 'my-react-blog-522a5.firebaseapp.com',
  projectId: 'my-react-blog-522a5',
  storageBucket: 'my-react-blog-522a5.appspot.com',
  messagingSenderId: '646388242753',
  appId: '1:646388242753:web:50a4d355d823302b3ea9c0',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
