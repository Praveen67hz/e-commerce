import React, { useContext, useEffect, useState } from "react";
import ShippingForm from "./ShippingForm";
import ShippingMethodSelector from "./ShippingMethodSelector";
import { ShopContext } from "../Context/ShopContext";
import '../Pages/CSS/ShippingPage.css';
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ShippingPage = () => {
  const [shippingAddress, setShippingAddress] = useState({});
  const{ setShippingMethod , setShippingCost ,setCouponCode , setDiscountAmount} =useContext(ShopContext);
  const [enteredCode , setEnteredCode] = useState("");

  useEffect(() => {
    const savedAddress = JSON.parse(localStorage.getItem("shippingAddress"));
    if (savedAddress) setShippingAddress(savedAddress);
  }, []);

  const applyCoupon = () => {
    if (enteredCode === "SAVE10") {
      setCouponCode("SAVE10");
      setDiscountAmount(10); 
      localStorage.setItem("couponCode", "SAVE10");
      localStorage.setItem("discountAmount", 10);
      toast("Coupon Applied: $10 discount!");
    } else {
      setCouponCode("");
      setDiscountAmount(0);
      localStorage.removeItem("couponCode");
      localStorage.removeItem("discountAmount");
      toast("Invalid coupon code.");
    }
  };
  

  const handleAddressSubmit = (address) => {
    setShippingAddress(address);
    localStorage.setItem("shippingAddress", JSON.stringify(address));
  };

  const handleShippingMethodChange = (method) => {
    const cost = calculateShippingCost(method);
    setShippingMethod(method);
    setShippingCost(cost);
  };
  

  const calculateShippingCost = (method) => {
    switch (method) {
      case "Standard":
        return 5;
      case "Express":
        return 10;
      case "NextDay":
        return 20;
      default:
        return 0;
    }
  };

  return (
    <div className="shipping-container">
  <div className="shipping-box">
    <h2>SHIPPING</h2>
  <ShippingForm onSubmit={handleAddressSubmit} />

  <div className="coupon-section">
  <input
    type="text"
    value={enteredCode}
    onChange={(e) => setEnteredCode(e.target.value)}
    placeholder="Enter coupon code"
  />
  <button onClick={applyCoupon}>Apply Coupon</button>
</div>

  <ShippingMethodSelector onMethodChange={handleShippingMethodChange} />

  <Link to = "/payment">
  <button className="proceed-btn" >
    Proceed to Payment
  </button>
  </Link>

 </div>
 </div>
  );
};

export default ShippingPage;
