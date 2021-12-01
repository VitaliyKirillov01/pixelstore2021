import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { detailsProduct } from "../actions/productActions";

function ProductScreen(props) {
  const [qty, setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsProduct(props.match.params.id));
    return () => {
      //
    };
  }, []);

  const handleAddToCart = () => {
    props.history.push("/cart/" + props.match.params.id + "?qty=" + qty);
  };

  return (
    <div>
      <div className="back-to-result" style={{marginTop: '5px'}}>
        <Link to="/" className="button" style={{margin: '0', padding:'3px 7px 5px'}}>
          &#60; Back to products
        </Link>
      </div>
      {loading ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "large",
            height: "100%",
          }}
        >
          Loading...
        </div>
      ) : error ? (
        <div>{error} </div>
      ) : (
        <div className="details">
          <div className="details-image">
            <img src={product.image} alt="product"></img>
          </div>
          <div className="details-info">
            <ul>
              <li>
                <h1>{product.name}</h1>
              </li>
              <li>
                Price: <b>${product.price}</b>
              </li>
              <li>
                Description:
                <div>{product.description}</div>
              </li>
            </ul>
          </div>
          <div className="details-action">
            <ul>
              <li>Price: <b>${product.price}</b></li>
              <li style={{ display: "flex", alignItems: "center" }}>
                Status:{" "}
                {product.countInStock > 0 ? (
                  <p style={{ color: "green", marginLeft: "5px" }}>In Stock</p>
                ) : (
                  <p style={{ color: "red", marginLeft: "5px" }}>Unavailable</p>
                )}
              </li>
              <li>
                Qty:{" "}
                <select
                  value={qty}
                  onChange={(e) => {
                    setQty(e.target.value);
                  }}
                >
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </li>
              <li>
                {product.countInStock > 0 && (
                  <button onClick={handleAddToCart} className="button primary">
                    Add to Cart
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
export default ProductScreen;
