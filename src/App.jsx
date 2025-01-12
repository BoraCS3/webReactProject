
import './App.css'
import Homepage from './pages/Homepage'
import Header from './component/Header'
import Products from './pages/Products'
import Footer from './component/Footer'
import Product from './component/Product'
// import Carts from './component/carts'
// import Contact from './pages/contact'
// import Cart from ''

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Carts from './component/carts'
import Checkout from './component/checkout'
// import { useState } from 'react'
// import Paypal from './component/PalPal';
import PayPalButton from './component/PayPalButtons'
// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"


function App() {

//   <PayPalScriptProvider options={{ "client-id": "Af-YjBz6rydCaCm5tPUtiKHDETSuFi1LRO8_IFhqVNtH2MMJIVgfw64WEWU6pkUiUeIFHePkmgy0baNY&currency=USD" }}>
//   <div>
//     <h1>PayPal Integration</h1>
//     <PayPalButtons
//       createOrder={(data, actions) => {
//         return actions.order.create({
//           purchase_units: [{
//             amount: {
//               value: "10.00" // Amount in USD
//             }
//           }]
//         });
//       }}
//       onApprove={(data, actions) => {
//         return actions.order.capture().then((details) => {
//           alert(`Transaction completed by ${details.payer.name.given_name}`);
//         });
//       }}
//     />
//   </div>
// </PayPalScriptProvider>

    // const [checkout, setCheckOut] = useState(false);
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/Products' element={<Products />} />
          <Route path='/Products/:id' element={<Product />} />
          <Route path='/carts' element={<Carts />} />
          <Route path='/checkout' element={<Checkout />} />
          {/* <Route path='/contact' element={<contact/>}/> */}
          {/* <Route path='/paypal' element={<Paypal />} /> */}
          <Route path='/paypalbtn' element={<PayPalButton />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
