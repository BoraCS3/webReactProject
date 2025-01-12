// import React from "react";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
// import { useSelector } from "react-redux";
// import productCart from "../component/productCart";

const getCart = () => JSON.parse(localStorage.getItem("cart")) || [];
const setCart = (cart) => localStorage.setItem("cart", JSON.stringify(cart));

const Homepage = () => {

    const [data, setData] = useState([]);
    const [filter, setFilter] = useState(data);
    const [loading, setLoading] = useState(false);
    let componentMounted = true;


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
        const displayIds = [6, 11, 18];
        const displayIds1 = [1, 6, 11, 16, 20];

        return (
            <>

                <div className="row">
                    {filter
                        .filter((product) => displayIds.includes(product.id)) // Filter products by ID
                        .map((product) => {
                            return (
                                <div className="col-md-4 g-3" key={product.id}>
                                    <a href="">
                                        <div className="card p-5  text-center align-items-center justify-content-center">
                                            <img src={product.image} className="card-img-top" alt={product.title} height="250px" />
                                            <div className="position-absolute card-body">
                                                <h5 className="card-title mb-0 bg-danger text-white text-uppercase px-4 py-3 rounded-2">{product.category.substring(0, 20)}...</h5>
                                                {/* <NavLink to={`/products/${product.id}`} className="btn btn-outline-danger">View Details</NavLink> */}
                                            </div>
                                        </div>
                                    </a>


                                </div>
                            );
                        })}
                </div>
                <h1 className=" text-black fs-1 py-5 fw-bold text-center">New Arrivals</h1>


                <div className="buttons d-flex justify-content-center my-3">
                    <button className="btn me-2 btn-danger" onClick={() => setFilter(data)}>All</button>
                    <button className="btn me-2 btn-outline-danger" onClick={() => filterProduct("men's clothing")}>Men's Cloth</button>
                    <button className="btn me-2 btn-outline-danger" onClick={() => filterProduct("women's clothing")}>Woman's Cloth</button>
                    <button className="btn me-2 btn-outline-danger" onClick={() => filterProduct("jewelery")}>Jewelery</button>
                    <button className="btn btn-outline-danger" onClick={() => filterProduct("electronics")}>Electronic</button>
                </div>
                {filter.slice(0, 15).map((product) => {
                    // const carts = useSelector(store => store.cart.items);
                    // console.log(carts);
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
                                    <div className="red_button add_to_cart_button"><a href="#" onClick={() =>handleAddToCart(product)}>Add to cart</a></div>
                                </div>
                            </div>

                        </>
                    )
                })}


                <div className="deal_ofthe_week mt-5">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-6">
                                <div className="deal_ofthe_week_img p-3">
                                    {filter.slice(2, 3).map((product) => {
                                        return (
                                            <>
                                                <img src={product.image} class="card-img rounded-0 d-none d-lg-block" alt=" " width="160px" height="350px" />

                                            </>
                                        )
                                    })}
                                    {/* <img src="images/deal_ofthe_week.png" alt /> */}
                                </div>
                            </div>
                            <div className="col-lg-6 text-right deal_ofthe_week_col">
                                <div className="deal_ofthe_week_content d-flex flex-column align-items-center float-right">
                                    <div className="section_title">
                                        <h2>Deal Of The Week</h2>
                                    </div>
                                    <ul className="timer">
                                        <li className="d-inline-flex flex-column justify-content-center align-items-center">
                                            <div id="day" className="timer_num">03</div>
                                            <div className="timer_unit">Day</div>
                                        </li>
                                        <li className="d-inline-flex flex-column justify-content-center align-items-center">
                                            <div id="hour" className="timer_num">15</div>
                                            <div className="timer_unit">Hours</div>
                                        </li>
                                        <li className="d-inline-flex flex-column justify-content-center align-items-center">
                                            <div id="minute" className="timer_num">45</div>
                                            <div className="timer_unit">Mins</div>
                                        </li>
                                        <li className="d-inline-flex flex-column justify-content-center align-items-center">
                                            <div id="second" className="timer_num">23</div>
                                            <div className="timer_unit">Sec</div>
                                        </li>
                                    </ul>
                                    <div className="red_button deal_ofthe_week_button"><a href="#">shop now</a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <h1 className=" text-black fs-1 py-5 fw-bold text-center border-3 border-bottom border-danger">Best Salers</h1>

                {filter.filter((product) => displayIds1.includes(product.id)).map((product) => {
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
                                    {/* <div className="red_button add_to_cart_button"><a href="#">Add to cart</a></div> */}
                                </div>
                            </div>



                            {/* <div className="col-md-3 g-3">
                                <div class="card px-3 pt-3 pb-0 h-100 text-center " key={product.id}>
                                    <img src={product.image} class="card-img-top" alt={product.title} height="330px" />
                                    <div class="card-body">
                                        <h5 class="card-title mb-0">{product.title.substring(0, 20)}...</h5>
                                        <p class="card-text lead fw-bold fs-3 text-danger">
                                            ${product.price}
                                        </p>
                                        <NavLink to={`/products/${product.id}`} class="btn btn-outline-danger" style={{ backgroundColor: "orangered", color: "white", borderRadius: "5px", padding: "10px" }}>View Details</NavLink>
                                    </div>
                                </div>
                            </div> */}

                        </>
                    )
                })}

                <div className="benefit">
                    <div className="container">
                        <div className="row benefit_row">
                            <div className="col-lg-3 benefit_col">
                                <div className="benefit_item d-flex flex-row align-items-center">
                                    <div className="benefit_icon"><i className="fa fa-truck" aria-hidden="true" /></div>
                                    <div className="benefit_content">
                                        <h6>free shipping</h6>
                                        <p>Suffered Alteration in Some Form</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 benefit_col">
                                <div className="benefit_item d-flex flex-row align-items-center">
                                    <div className="benefit_icon"><i className="fa fa-money" aria-hidden="true" /></div>
                                    <div className="benefit_content">
                                        <h6>cach on delivery</h6>
                                        <p>The Internet Tend To Repeat</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 benefit_col">
                                <div className="benefit_item d-flex flex-row align-items-center">
                                    <div className="benefit_icon"><i className="fa fa-undo" aria-hidden="true" /></div>
                                    <div className="benefit_content">
                                        <h6>45 days return</h6>
                                        <p>Making it Look Like Readable</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 benefit_col">
                                <div className="benefit_item d-flex flex-row align-items-center">
                                    <div className="benefit_icon"><i className="fa fa-clock-o" aria-hidden="true" /></div>
                                    <div className="benefit_content">
                                        <h6>opening all week</h6>
                                        <p>8AM - 09PM</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </>
        )

    }
    return (
        <div className=" bg-body-tertiary">
            <div className="hero">
                <div class="card text-bg-secondary bg-opacity-25 rounded-0 border-0">

                    <img src="" class="card-img rounded-0 d-none d-lg-block" alt=" " height="700px" />
                    <div class="card-img-overlay d-flex flex-column justify-content-center">
                        <div className="container">
                            <div className="row d-flex justify-content-center align-items-center">
                                <div className="col-7 pt-5">
                                    <p className="text-uppercase fw-bold text-black">Spring / summer collection 2024</p>
                                    <h5 class="card-title display-3 text-black mb-0">Get up to 30%  Off<br /> New Arrivals</h5>
                                    <NavLink to="/Products" class="btn btn-danger fs-4 mt-3" style={{ backgroundColor: "orangered", color: "white", borderRadius: "5px", marginTop: "15px", padding: "10px 25px" }}>Shop Now</NavLink>
                                </div>
                                <div className="col-5 pt-5">
                                    {filter.slice(2, 3).map((product) => {
                                        return (
                                            <>
                                                <img src={product.image} class="card-img rounded-0 d-none d-lg-block rounded-4" alt=" " width="160px" height="400px" />

                                            </>
                                        )
                                    })}
                                </div>
                            </div>
                            {/* <p className="text-uppercase fw-bold text-black">Spring / summer collection 2024</p>
                            <h5 class="card-title display-3 text-black mb-0">Get up to 30%  Off<br /> New Arrivals</h5>
                            <a href="#" class="btn btn-danger">Shop Now</a> */}
                            {/* {filter.slice(0, 1).map((product) => {
                                return (
                                    <>
                                        <img src={product.image} class="card-img rounded-0 d-none d-lg-block" alt=" " width="300px" height="100px" />

                                    </>
                                )
                            })} */}
                        </div>
                    </div>
                </div>
            </div>
            <div className="container my-5">
                <div className="row">
                    <div className="col-12 my-4">
                        <h1 className="display-6 text-black fs-1 text-center"></h1>
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

export default Homepage;