import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";

const ShippingForm = ({ onSubmit }) => {
  const { shippingDetails, setShippingDetails } = useContext(ShopContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails({ ...shippingDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(shippingDetails); 
  };

  return (
    <form onSubmit={handleSubmit} className="shipping-form">
      <div className="input-row">
        <div className="input-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={shippingDetails.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={shippingDetails.address}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <div className="input-row">
        <div className="input-group">
          <label>City:</label>
          <input
            type="text"
            name="city"
            value={shippingDetails.city}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <div className="input-row">
        <div className="input-group">
          <label>Postal Code:</label>
          <input
            type="text"
            name="postalCode"
            value={shippingDetails.postalCode}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Country:</label>
          <input
            type="text"
            name="country"
            value={shippingDetails.country}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <button type="submit" className="submit-btn">Submit Shipping Address</button>
    </form>
  );
};

export default ShippingForm;
