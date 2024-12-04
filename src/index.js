import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './layouts/App';
import Home from './components/js/home';
import Store from './components/js/store';
import BuyHistory from './components/js/buyhistory';
import TopupHistory from './components/js/topuphistory';
import Topup from './components/js/topup';
import reportWebVitals from './reportWebVitals';
import Product from './components/js/product';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />}/>
        <Route path='store' element={<Store />}/>
        <Route path='buyhistory' element={<BuyHistory />}/>
        <Route path='topuphistory' element={<TopupHistory />}/>
        <Route path='topup' element={<Topup />}/>
        <Route path='product' element={<Product />}/>
      </Route>
    </Routes>
  </Router>
);

reportWebVitals();
