import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Skeleton from "react-loading-skeleton";

const Products = () => {
  const url = "https://fakestoreapi.com/products";
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState([]);

  const getDataProducts = async () => {
    try {
      const response = await fetch(url);
      const dataProduct = await response.json();
      setData(dataProduct);
      setFilter(dataProduct);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getDataProducts();
  }, []);

  const Loading = () => {
    return (
      <>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
      </>
    );
  };

  const filterProduct = (cat) => {
    if (cat === "sale") {
      setFilter(data);
    } else {
      const updateList = data.filter((item) => item.category === cat);
      setFilter(updateList);
    }
  };


  const ShowProduct = () => {
    return (
      <>
        <div className="buttons d-flex justify-content-end mb-2">
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => filterProduct("men's clothing")}
          >
            Men's
          </button>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => filterProduct("women's clothing")}
          >
            Women's
          </button>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => filterProduct("jewelery")}
          >
            Jewelry
          </button>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => filterProduct("electronics")}
          >
            Electronics
          </button>
        </div>
        <div className="row">
          {filter.map((props) => (
            <div className="col-md-3 mb-4" key={props.id}>
              <CardProduct
                title={props.title}
                price={props.price}
                category={props.category}
                image={props.image}
                id={props.id}
              />
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <div>
      <div className="container my-3 py-5">
        <div className="row">
          <div className="col-12 mb-3">
            <h1 className="display-6 fw-bolder text-center">Best Products</h1> <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProduct />}
        </div>
      </div>
    </div>
  );
};

function CardProduct({ title, price, image, id }) {
  return (
    <Card className="mb-4 text-center shadow-sm" style={{ width: "250px" }} key={id}>
      <Card.Img
        src={image}
        alt={title}
        className="p-4 img-top"
        style={{
          height: "300px",
          objectFit: "cover",
          width: "100%",      
        }}
      />
      <Card.Body>
        <Card.Title>{title.substring(0, 12)}</Card.Title>
        <Card.Text className="text-muted mb-3" style={{ minHeight: "50px" }}>
          <p className="mb-0 fw-bold">Price: ${price}</p>
          <NavLink to={`/sale/${id}`}>View Details</NavLink>
        </Card.Text>
        
      </Card.Body>
    </Card>
  );
}


export default Products;

