import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { delItem } from "../redux/action/index";

const Cart = () => {
  const [isCartVisible, setIsCartVisible] = useState(false);
  const state = useSelector((state) => state.addItem);
  const dispatch = useDispatch();

  const handleToggleCart = () => {
    setIsCartVisible(!isCartVisible);
  };

  const handleClose = (item) => {
    dispatch(delItem(item));
  };

  const cartItems = () =>
    state.map((cartItem) => {
      const { id, img, title, price } = cartItem;
      return (
        <div className="cart-item d-flex align-items-center my-2" key={id}>
          <img
            src={img}
            alt={title}
            height="50px"
            width="50px"
            className="me-3"
          />
          <div>
            <h6>{title}</h6>
            <p className="m-0">${price}</p>
          </div>
          <button
            onClick={() => handleClose(cartItem)}
            className="btn btn-sm btn-danger ms-auto"
          >
            Remove
          </button>
        </div>
      );
    });

  const emptyCart = () => (
    <div className="text-center py-3">
      <p>Your cart is empty</p>
    </div>
  );

  return (
    <div className="cart-wrapper position-relative">
      <button
        onClick={handleToggleCart}
        className="btn btn-light position-relative"
      >
        <i className="bi bi-cart"></i>
        {state.length > 0 && (
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {state.length}
          </span>
        )}
      </button>

      {isCartVisible && (
        <div
          className="cart-menu bg-light border rounded position-absolute end-0 mt-2"
          style={{ width: "300px", zIndex: 1000 }}
        >
          <div className="p-3">
            <h5>Your Cart</h5>
            <hr />
            {state.length === 0 ? emptyCart() : cartItems()}
            {state.length > 0 && (
              <NavLink
                to="/checkout"
                className="btn btn-dark w-100 mt-3"
                onClick={() => setIsCartVisible(false)}
              >
                Proceed to Checkout
              </NavLink>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
