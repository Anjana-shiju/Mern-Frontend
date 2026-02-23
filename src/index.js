import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import HomePage from './PAGES/HomePage';

import About from './PAGES/About';
import Tourr from './PAGES/Tourr';
import Activityy from './PAGES/Activityy';
import Galleryyyy from './PAGES/Galleryyyy';
import Contacttt from './PAGES/Contacttt';






const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
