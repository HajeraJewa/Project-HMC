import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Products from './components/Product';
import CustomNavbar from './components/NavbarComponent';
import Home from './components/Home';
import Produk from './components/Card';
import Cart from './components/Cart';
import Checkout from './components/Checkout'; 
import PaymentPage from './components/Payment';

function App() {
  return (
    <Router>
      <CustomNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sale" element={<Products />} />
        <Route path="/sale/:id" element={<Produk />} />
        <Route path="/cart" element={<Cart />} /> 
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<PaymentPage/>} />
      </Routes>
    </Router>
  );
}

export default App;

