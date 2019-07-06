import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const ITEMS = [
    {price: 15.09, quantity: 1, name: 'Chic Teri Omu RC'},
    {price: 1.13, quantity: 5, name: 'Green Tea'},
    {price: 17.92, quantity: 1, name: 'Htt Spicy Pasta'},
    {price: 16.04, quantity: 1, name: 'Sirloin S Pasta'},
    {price: 10.38, quantity: 1, name: 'Kino Cream Pasta'},
    {price: 16.98, quantity: 1, name: 'Sal Cream Pasta'}
  ];

ReactDOM.render(<App items={ITEMS}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
