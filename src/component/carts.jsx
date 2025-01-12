
import React, { useEffect, useState } from "react";
// import { Table, Button, Space, Image, Modal, Select, message, Popconfirm } from "antd";

import { NavLink } from "react-router-dom";


const getCart = () => JSON.parse(localStorage.getItem("cart")) || [];
const setCart = (cart) => localStorage.setItem("cart", JSON.stringify(cart));
function Carts() {

    const [cart, setCartState] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const cartData = getCart();
        setCartState(cartData);
        // setTotalPrice(calculateTotalPrice(cartData));
    }, []);

    const updateCart = (newCart) => {
        setCartState(newCart);
        setCart(newCart);
        setTotalPrice(calculateTotalPrice(newCart)); 
      };
    
      const increaseQuantity = (productId) => {
        const updatedCart = cart.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
        updateCart(updatedCart);
      };
    
      const decreaseQuantity = (productId) => {
        const updatedCart = cart.map((item) =>
          item.id === productId && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
        updateCart(updatedCart);
      };
    
      const removeFromCart = (productId) => {
        const updatedCart = cart.filter((item) => item.id !== productId);
        updateCart(updatedCart);
      };
    
      const calculateTotalPrice = (cartData) => {
        return cartData.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      };
    
      const calculateTotalQuantity = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
      };
 

    console.log(cart)

    const ival = document.getElementById('ival');
    var totalprice = 0;
    cart.forEach(element => {
       console.log( element.price);
       totalprice += element.price;
    });

    return (
        <>
            <div className="mgt-5">
                <div className="bg-light py-3">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 mb-0 fs-4 py-4"><a href="index.html">Home</a> <span className="mx-2 mb-0">/</span> <strong className="text-black">Cart</strong></div>
                        </div>
                    </div>
                </div>
                <div className="site-section">
                    <div className="container">
                        <div className="row mb-5">
                            <form className="col-md-12" method="post">
                                <div className="site-blocks-table">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th className="product-thumbnail text-center">Image</th>
                                                <th className="product-name text-center">Product</th>
                                                <th className="product-price text-center">Price</th>
                                                <th className="product-quantity text-center">Quantity</th>
                                                <th className="product-total text-center">Total</th>
                                                <th className="product-remove text-center">Remove</th>
                                            </tr>
                                        </thead>

                                        {cart.map((product) => {
                                            return (
                                                <>
                                                    <tbody>
                                                        <tr>
                                                            <td className="product-thumbnail text-center align-content-center" >
                                                                <img src={product.image} alt="Image" width="100px" height="60px" className="img-fluid" />
                                                            </td>
                                                            <td className="product-name text-start align-content-center">
                                                                <h5 className=" text-black ">{product.title}</h5>
                                                            </td>
                                                            <td className="text-center align-content-center">${product.price}</td>
                                                            <td className=" d-flex justify-content-center align-items-center">
                                                                <div className="input-group mt-5" style={{ maxWidth: 100}}>
                                                                    <div className="input-group-prepend">
                                                                        <a className="btn btn-outline-primary js-btn-minus" type="button" onClick={() => decreaseQuantity(product.id)}> − </a>
                                                                    </div>
                                                                    <input type="text" className="form-control text-center border-0" id="ival" defaultValue={product.quantity} placeholder aria-label="Example text with button addon" aria-describedby="button-addon1" />
                                                                    <div className="input-group-append">
                                                                        <a className="btn btn-outline-primary js-btn-plus" type="button" onClick={() => increaseQuantity(product.id)} >+</a>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="text-center align-content-center">{product.price * product.quantity}</td>
                                                            <td className="text-center align-content-center"><a href="" className="btn btn-primary btn-sm" onClick={() => removeFromCart(product.id)}>X</a></td>
                                                        </tr>
                                                    </tbody>

                                                </>
                                            )
                                        })}

                                        {/* <tbody>
                                            <tr>
                                                <td className="product-thumbnail">
                                                    <img src="images/cloth_1.jpg" alt="Image" className="img-fluid" />
                                                </td>
                                                <td className="product-name">
                                                    <h2 className="h5 text-black">Top Up T-Shirt</h2>
                                                </td>
                                                <td>$49.00</td>
                                                <td>
                                                    <div className="input-group mb-3" style={{ maxWidth: 120 }}>
                                                        <div className="input-group-prepend">
                                                            <button className="btn btn-outline-primary js-btn-minus" type="button">−</button>
                                                        </div>
                                                        <input type="text" className="form-control text-center" defaultValue={1} placeholder aria-label="Example text with button addon" aria-describedby="button-addon1" />
                                                        <div className="input-group-append">
                                                            <button className="btn btn-outline-primary js-btn-plus" type="button">+</button>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>$49.00</td>
                                                <td><a href="#" className="btn btn-primary btn-sm">X</a></td>
                                            </tr>
                                        </tbody> */}
                                    </table>
                                </div>
                            </form>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="row mb-5">
                                    <div className="col-md-6">
                                        <NavLink to="/Products" className="btn border-2 btn-outline-primary btn-sm btn-block py-2 px-3 fs-5 fw-bold">Continue Shopping</NavLink>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <label className="text-black h4" htmlFor="coupon">Coupon</label>
                                        <p>Enter your coupon code if you have one.</p>
                                    </div>
                                    <div className="col-md-8 mb-3 mb-md-0">
                                        <input type="text" className="form-control py-3" id="coupon" placeholder="Coupon Code" />
                                    </div>
                                    <div className="col-md-4">
                                        <button className="btn btn-primary btn-sm py-3 px-4">Apply Coupon</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 pl-5">
                                <div className="row justify-content-end">
                                    <div className="col-md-7">
                                        <div className="row">
                                            <div className="col-md-12 text-right border-bottom mb-5">
                                                <h3 className="text-black h4 text-uppercase">Cart Totals</h3>
                                            </div>
                                        </div>
                                        <div className="row mb-3 py-4">
                                            <div className="col-md-6">
                                                <h4 className="text-black">Total Price :</h4>
                                            </div>
                                            <div className="col-md-6 text-right">
                                                <strong className="text-primary fs-2">$ {calculateTotalPrice (cart)}</strong>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-12">
                                                <NavLink to="/checkout" className="btn btn-primary btn-lg py-3 btn-block" >Proceed To Checkout</NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}
export default Carts;

