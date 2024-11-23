import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import { delItem } from '../redux/action/index';

const Checkout = () => {
  const cart = useSelector((state) => state.handleCart); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemoveItem = (item) => {
    dispatch(delItem(item));
  };

  const handleIncreaseQty = (item) => {
    dispatch({
      type: 'ADDITEM',
      payload: item,
    });
  };

  const handleDecreaseQty = (item) => {
    dispatch({
      type: 'DELITEM',
      payload: item,
    });
  };

  const calculateTotal = () => {
    return cart.reduce((acc, item) => acc + item.qty * item.price, 0);
  };

  const handleProceedToPayment = () => {
    let previousOrders = JSON.parse(localStorage.getItem('orders')) || [];
    
    previousOrders.push(cart);
    localStorage.setItem('orders', JSON.stringify(previousOrders));
    localStorage.setItem('cart', JSON.stringify(cart));

    navigate('/payment');
  };

  return (
    <div className="container mt-5">
      <h2>Your Checkout</h2>
      {cart.length === 0 ? (
        <div>Your cart is empty</div>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} className="d-flex justify-content-between mb-3">
              <div className="d-flex align-items-center">
                <img src={item.image} alt={item.title} style={{ width: '50px', height: '50px' }} />
                <div className="ms-3">
                  <p className="mb-0">{item.title}</p>
                  <p className="mb-0">${item.price}</p>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <button
                  className="btn btn-sm btn-secondary me-2"
                  onClick={() => handleDecreaseQty(item)}
                >
                  -
                </button>
                <span>{item.qty}</span>
                <button
                  className="btn btn-sm btn-secondary ms-2"
                  onClick={() => handleIncreaseQty(item)}
                >
                  +
                </button>
                <button
                  className="btn btn-dark btn-sm ms-3"
                  onClick={() => handleRemoveItem(item)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <hr />
          <div className="d-flex justify-content-between">
            <h4>Total:</h4>
            <h4>${calculateTotal()}</h4>
          </div>
          <div className="mt-3">
            <button onClick={handleProceedToPayment} className="btn btn-primary w-100">
              Proceed to Payment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;

