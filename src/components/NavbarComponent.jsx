import React, { useState } from "react";
import { Navbar, Nav, Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css"; // Ensure Bootstrap Icons are included
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { delItem } from "../redux/action/index";

function CustomNavbar() {
  const state = useSelector((state) => state.handleCart);
  const dispatch = useDispatch();
  const [isCartOpen, setCartOpen] = useState(false);

  const toggleCart = () => {
    setCartOpen(!isCartOpen);
  };

  const handleRemoveItem = (item) => {
    dispatch(delItem(item));
  };

  const closeCart = () => {
    setCartOpen(false);
  };

  return (
    <>
      <Navbar expand="lg" className="custom-navbar">
        <Container>
          <Row className="w-100 align-items-center">
            <Col xs={3}>
              <Nav className="justify-content-start">
                <NavLink to="/women" className="nav-link ms-3 text-dark">
                  Contact
                </NavLink>
                <NavLink to="/kids" className="nav-link ms-3 text-dark">
                  About
                </NavLink>
                <NavLink to="/sale" className="nav-link ms-3 text-dark">
                  Sale
                </NavLink>
              </Nav>
            </Col>

            <Col xs={6} className="text-center">
              <NavLink to="/" className="custom-brand fs-2">
                Hajera
              </NavLink>
            </Col>

            <Col xs={3} className="text-end">
              <div className="d-flex align-items-center justify-content-end">
                <div
                  onClick={toggleCart}
                  style={{ cursor: "pointer", position: "relative" }}
                >
                  <i
                    className="bi bi-cart ms-3"
                    style={{ fontSize: "24px" }}
                  ></i>
                  {state.length > 0 && (
                    <span
                      style={{
                        position: "absolute",
                        top: "-5px",
                        right: "-5px",
                        backgroundColor: "black",
                        color: "white",
                        borderRadius: "50%",
                        padding: "5px 10px",
                        fontSize: "11px",
                      }}
                    >
                      {state.length}
                    </span>
                  )}
                </div>
                <NavLink to="/search" className="nav-link ms-3">
                  <i className="bi bi-search" style={{ fontSize: "24px" }}></i>
                </NavLink>
                <NavLink to="/profile" className="nav-link ms-3">
                  <i className="bi bi-person" style={{ fontSize: "24px" }}></i>
                </NavLink>
              </div>
            </Col>
          </Row>
        </Container>
      </Navbar>

      {isCartOpen && (
        <div
          className="cart-side-panel"
          style={{
            position: "fixed",
            top: "0",
            right: "0",
            width: "500px",
            height: "100%",
            backgroundColor: "#fff",
            boxShadow: "-2px 0 10px rgba(0, 0, 0, 0.1)",
            zIndex: "1000",
            overflowY: "auto",
            padding: "20px",
          }}
        >
          <div className="d-flex justify-content-between align-items-center">
            <h4>Your Cart</h4>
            <Button
              variant="link"
              onClick={closeCart}
              style={{ fontSize: "20px" }}
            >
              <i className="bi bi-x"></i>
            </Button>
          </div>
          <div>
            {state.length === 0 ? (
              <div
                className="text-center"
              >
                Your Cart is Empty
              </div>
            ) : (
              state.map((item) => (
                <div
                  key={item.id}
                  className="d-flex align-items-center justify-content-between mb-3 mt-4"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{ width: "50px", height: "50px" }}
                  />
                  <div className="ms-3 flex-grow-1">
                    <p
                      className="mb-1"
                      style={{ fontSize: "14px", fontWeight: "bold" }}
                    >
                      {item.title}
                    </p>
                    <p
                      className="mb-0"
                      style={{ fontSize: "12px", color: "#888" }}
                    >
                      {item.qty} x ${item.price}
                    </p>
                  </div>
                  <button
                    className="btn btn-danger btn-sm ms-auto"
                    onClick={() => handleRemoveItem(item)}
                    style={{ borderRadius: "50%" }}
                  >
                    <i className="bi bi-x"></i>
                  </button>
                </div>
              ))
            )}
            {state.length > 0 && (
              <NavLink to="/checkout" className="btn btn-primary w-100 mt-3">
                Proceed to Checkout
              </NavLink>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default CustomNavbar;
