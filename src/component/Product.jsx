import React, {useState, useEffect} from "react";
// import { useDispatch } from "react-redux";
// import { addCart } from "../redux/action";
import { useParams } from "react-router";
import { NavLink } from "react-router";
import Skeleton from "react-loading-skeleton";
const getCart = () => JSON.parse(localStorage.getItem("cart")) || [];
const setCart = (cart) => localStorage.setItem("cart", JSON.stringify(cart));
const Product = () => {

    const {id} = useParams();
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);

    // const dispatch = useDispatch();
    // const addProduct  = (product) => {
    //     dispatch(addCart(product));
    // }


    useEffect(() =>{
        const getProduct = async () => {
            setLoading(true);
            const response = await fetch(`https://fakestoreapi.com/products/${id}`);
            setProduct(await response.json());
            setLoading(false);
        }
        getProduct();
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


    const Loading = () =>{
        return(
            <>
                <div className="col-md-6">
                    <Skeleton height={400}/>
                </div>
                <div className="col-md-6">
                    <Skeleton height={50} width={300}/>
                    <Skeleton height={75}/>
                    <Skeleton height={25} width={150} />
                    <Skeleton height={50}/>
                    <Skeleton height={150} />
                    <Skeleton height={50} width={100} />
                    <Skeleton height={50} width={100} style={{marginLeft:6}}/>
                </div>
            </>
        )
    }
    const ShowProduct = () =>{
        return (
            <>
                <div className="col-md-6 mt-5 pt-5">
                    <img src={product.image} alt={product.title} height='400px' width="400px" />
                </div>
                <div className="col-md-6  mt-5 pt-5">
                    <h4 className="text-uppercase text-black-50">{product.category}</h4>
                    <h1 className="display-6"> {product.title}</h1>
                    <p className="lead fw-bold ">{product.rating && product.rating.rate} <i className="fa ms-3 text-warning fa-star"></i></p> 
                    <h3 className="display-6 fw-bold py-1"> $ {product.price}</h3>
                    <p className="lead">{product.description}</p>
                    <button className="btn btn-danger px-4 py-2 " onClick={() =>handleAddToCart(product)}>
                        Add to Cart
                    </button>
                    <NavLink className='btn border-2 border-danger text-danger px-3 py-2 ms-3' to='/Products' >Go Back</NavLink>
                </div>
            </>
        )
    }
    return (
        <div>
            <div className="container py-5">
                <div className="row py-4">
                    {loading ? < Loading /> : <ShowProduct/>}
                </div>
            </div>
        </div>
    );
}
export default Product;