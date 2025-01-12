import React, { useEffect, useState } from 'react';


const getCart = () => JSON.parse(localStorage.getItem("cart")) || [];
const setCart = (cart) => localStorage.setItem("cart", JSON.stringify(cart));



const PayPalButton = () => {


        const [cart, setCartState] = useState([]);
        const [totalPrice, setTotalPrice] = useState(0);
    
        useEffect(() => {
            const cartData = getCart();
            setCartState(cartData);
            // setTotalPrice(calculateTotalPrice(cartData));
        }, []);
    
        var totalp = 0;
        {
            cart.map((pro) => {
                totalp += pro.price * pro.quantity;
            })
        }


  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.paypal.com/sdk/js?client-id=Acd7VcYoSnDwBYxYotg6ioiwEqzyV9RJO2BPYODfPWuJw8OwohyAKmfBdn8pTOPeo_5kn1IOEIIl2gGL";
    script.addEventListener("load", () => {
      window.paypal.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: {totalp}
              }
            }]
          });
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then((details) => {
            alert(`Transaction completed by ${details.payer.name.given_name}`);
          });
        }
      }).render("#paypal-button-container");
    });
    document.body.appendChild(script);
  }, []);

  return <div id="paypal-button-container" className=' m-auto '></div>;
};

export default PayPalButton;
