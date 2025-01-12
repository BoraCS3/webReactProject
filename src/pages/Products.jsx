import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {message} from 'antd'
import Skeleton from "react-loading-skeleton";


const getCart = () => JSON.parse(localStorage.getItem("cart")) || [];
const setCart = (cart) => localStorage.setItem("cart", JSON.stringify(cart));
const Products = () => {

    const [data, setData] = useState([]);
    const [filter, setFilter] = useState(data);
    const [loading, setLoading] = useState(false);
    let componentMounted = true;


    console.log(getCart)


    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            const response = await fetch('https://fakestoreapi.com/products');
            if (componentMounted) {
                setData(await response.clone().json());
                setFilter(await response.json());
                setLoading(false);
                console.log(filter);
            }
            return () => {
                componentMounted = false;
            }
        }
        getProducts();
    }, []);




    const handleAddToCart = (product) => {
        const cart = getCart();
        const productInCart = cart.find((item) => item.id === product.id);
    
        if (productInCart) {
          message.warning(`${product.title} is already in your cart!`);
        } else {
          setTimeout(() => {
            window.location.reload();
          }, 1000);
          cart.push({ ...product, quantity: 1 });
          setCart(cart);
    
          message.success(`${product.title} has been added to your cart!`);
        }
      };

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
        )
    }

    const filterProduct = (cat) => {
        const updatedList = data.filter((x) => x.category === cat);
        setFilter(updatedList);
    }

    const ShowProducts = () => {
        return (
            <>
                <div className="buttons d-flex justify-content-start my-3">
                    <button className="btn me-2 btn-danger" onClick={() => setFilter(data)}>All</button>
                    <button className="btn me-2 btn-outline-danger" onClick={() => filterProduct("men's clothing")}>Men's Cloth</button>
                    <button className="btn me-2 btn-outline-danger" onClick={() => filterProduct("women's clothing")}>Woman's Cloth</button>
                    <button className="btn me-2 btn-outline-danger" onClick={() => filterProduct("jewelery")}>Jewelery</button>
                    <button className="btn btn-outline-danger" onClick={() => filterProduct("electronics")}>Electronic</button>
                </div>
                {filter.map((product) => {
                    return (
                        <>

                            <div className="owl-item product_slider_item g-3">
                                <div className="product-item men">
                                    <div className="product mt-5">
                                        <NavLink to={`/products/${product.id}`}>
                                            <div className="product_image p-2">
                                                <img src={product.image} alt={product.title} height="200px" />
                                            </div>
                                            <div className="product_bubble product_bubble_right product_bubble_red d-flex flex-column align-items-center"><span>sale</span></div>
                                            <div className="favorite favorite_left" />
                                            <div className="product_info">
                                                <h6 className="product_name text-two-lines"><a href="single.html">{product.title}</a></h6>
                                                {/* <div className="product_price">${product.price}</div> */}
                                                <p class="card-text lead fw-bold fs-5 text-danger">
                                                    ${product.price}
                                                </p>
                                                {/* <NavLink to={`/products/${product.id}`} class="btn btn-outline-danger" style={{ backgroundColor: "orangered", color: "white", borderRadius: "5px", padding: "10px" }}>View Details</NavLink> */}
                                            </div>
                                        </NavLink>
                                    </div>
                                    <div className="red_button add_to_cart_button" ><a href="#" onClick={() =>handleAddToCart(product)}>Add to cart</a></div>
                                </div>
                            </div>

                        </>
                    )
                })}
            </>
        )

    }
    return (
        <div className=" bg-body-tertiary">
            <div className="container my-5">
                <div className="row">
                    <div className="col-12 my-4">
                        <h1 className="display-6 text-danger fw-bold text-start">Best Sale Products</h1>
                    </div>
                </div>
                <hr />
                <div className="row justify-content-center">
                    {loading ? < Loading /> : <ShowProducts />}
                </div>
            </div>
        </div>
    );
}
export default Products;