import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
// import Carts from './component/carts'
import axios from 'axios';



const getCart = () => JSON.parse(localStorage.getItem("cart")) || [];
const setCart = (cart) => localStorage.setItem("cart", JSON.stringify(cart));

function Header() {


        const [cart, setCartState] = useState([]);
        const [totalPrice, setTotalPrice] = useState(0);
    
        useEffect(() => {
            const cartData = getCart();
            setCartState(cartData);
            // setTotalPrice(calculateTotalPrice(cartData));
        }, []);
    
        var totalp = 0;
        var t1 = 0;
        {
            cart.map((pro) => {
                totalp += pro.price * pro.quantity;
                t1 += 1;
            })
        }

        const [language, setLanguage] = useState('en');
        const [text, setText] = useState({
          welcome: 'Get up to 30% Off New Arrivals',
          h11: ['Home', 'Shop', 'About Us', 'Contact'],
          selectLanguage: 'Select a language',
        });
        const translations = {
            en: 'Welcome',
            km: 'បញ្ចុះតម្លៃរហូតដល់ ៣០% ឥវ៉ាន់ដែលទើបមកដល់ថ្មីៗ',
            

          };
        
          const changeLanguage = async (lang) => {
            setLanguage(lang);
        
            // Check if Khmer translation is predefined
            if (lang === 'km') {
              setText({
                welcome: translations.km,
                selectLanguage: 'ជ្រើសរើសភាសា',
              });
              return;
            }
             // For other languages, fetch translations dynamically
    try {
        const response = await axios.post(
          'https://translation.googleapis.com/language/translate/v2',
          {},
          {
            params: {
              key: 'YOUR_GOOGLE_TRANSLATE_API_KEY',
              q: 'Welcome', // Text to translate
              target: lang, // Target language code
            },
          }
        );
        const translatedText = response.data.data.translations[0].translatedText;
        setText((prev) => ({
            ...prev,
            welcome: translatedText,
          }));
        } catch (error) {
          console.error('Translation API error:', error);
        }
      };  


    return (
        <>
            <header className="header trans_300">
                {/* Top Navigation */}
                <div className="top_nav">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="top_nav_left">free shipping on all u.s orders over $50</div>
                            </div>
                            <div className="col-md-6 text-right">
                                <div className="top_nav_right">
                                    <ul className="top_nav_menu">
                                        {/* Currency / Language / My Account */}
                                        <li className="currency">
                                            <NavLink href="#">
                                                usd
                                                <i className="fa fa-angle-down" />
                                            </NavLink>
                                            <ul className="currency_selection">
                                                <li><NavLink href="#">Paypal</NavLink></li>
                                                <li><NavLink href="#">Credit card </NavLink></li>
                                                {/* <li><NavLink href="#">eur</NavLink></li>
                                                <li><NavLink href="#">gbp</NavLink></li> */}
                                            </ul>
                                        </li>
                                        <li className="language">
                                        <button  onClick={() => changeLanguage('en')}>English</button>
                                        <button   onClick={() => changeLanguage('km')}>ភាសាខ្មែរ</button>
                                            {/* <NavLink href="#">
                                                English
                                                <i className="fa fa-angle-down" />
                                            </NavLink> */}
                                            {/* <ul className="language_selection">
                                                <li><NavLink href="#">Khmer</NavLink></li> */}
                                                {/* <li><NavLink href="#">Italian</NavLink></li> */}
                                                {/* <li><NavLink href="#">German</NavLink></li>
                                                <li><NavLink href="#">Spanish</NavLink></li> */}
                                            {/* </ul> */}
                                        </li>
                                        <li className="account">
                                            <NavLink href="#">
                                                My Account
                                                <i className="fa fa-angle-down" />
                                            </NavLink>
                                            <ul className="account_selection">
                                                <li><a href="#"><i className="fa fa-sign-in" aria-hidden="true" />Sign In</a></li>
                                                <li><a href="#"><i className="fa fa-user-plus" aria-hidden="true" />Register</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Main Navigation */}
                <div className="main_nav_container">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 text-right">
                                <div className="logo_container">
                                    <NavLink to="#">colo<span>shop</span></NavLink>
                                </div>
                                <nav className="navbar">
                                    <ul className="navbar_menu">
                                    {/* <p>{text.welcome}</p> */}

                                        <li><NavLink to="/">home</NavLink></li>
                                        <li><NavLink to="/Products">shop</NavLink></li>
                                        <li><NavLink to="/About">About Us</NavLink></li>
                                        <li><NavLink to="/contact">contact</NavLink></li>
                                    </ul>
                                    <ul className="navbar_user">
                                        <li><NavLink to="#"><i className="fa fa-search" aria-hidden="true" /></NavLink></li>
                                        <li><NavLink to="#"><i className="fa fa-user" aria-hidden="true" /></NavLink></li>
                                        <li className="checkout">
                                            <NavLink to="/carts">
                                                <i className="fa fa-shopping-cart" aria-hidden="true" />
                                                {/* <span>{t1}</span> */}
                                                <span id="checkout_items" className="checkout_items">{t1}</span>
                                            </NavLink>
                                        </li>
                                    </ul>
                                    <div className="hamburger_container">
                                        <i className="fa fa-bars" aria-hidden="true" />
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </header></>
    )
}

export default Header;