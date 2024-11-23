import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { addItem } from "../redux/action/index";

const Produk = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const dispatch = useDispatch();
    const cart = useSelector((state) => state.handleCart);

    const addProduct = (product) => {
        dispatch(addItem(product));
    };

    useEffect(() => {
        const getProduct = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://fakestoreapi.com/products/${id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch product");
                }
                const data = await response.json();
                setProduct(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        getProduct();
    }, [id]);

    const Loading = () => <p>Loading...</p>;

    const ShowProduct = () => (
        <>
            <div className="col-md-5 d-flex justify-content-center align-items-center">
                <img src={product.image} alt={product.title} height="300px" width="300px" />
            </div>
            <div className="col-md-6 py-5">
                <h4 className="text-uppercase text-black-50">{product.category}</h4>
                <h1 className="display-6">{product.title}</h1>
                <p className="lead">{product.description}</p>
                <h3 className="display-8 my-3">${product.price}</h3>
                <p className="lead fw-bolder">
                    Rating {product.rating?.rate || "N/A"}
                    <i className="fa fa-star"></i>
                </p>
                <button
                    className="btn btn-outline-dark px-4 py-2"
                    onClick={() => addProduct(product)} // Add to cart
                >
                    Add to Cart
                </button>
                {cart.length > 0 && (
                    <NavLink to="/Checkout" className="btn btn-outline-dark px-4 py-2 ms-3">
                        Go to Cart
                    </NavLink>
                )}
            </div>
        </>
    );

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <div className="container">
                <div className="row">{loading ? <Loading /> : <ShowProduct />}</div>
            </div>
        </div>
    );
};

export default Produk;
