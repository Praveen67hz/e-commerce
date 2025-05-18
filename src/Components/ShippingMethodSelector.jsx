import React from 'react'

const ShippingMethodSelector = ({onMethodChange}) => {
     const handleChange = (e) => {
      onMethodChange(e.target.value);
     };

  return (
    <div>
       <h3>Select Shipping Method</h3>
      <select onChange={handleChange}>
        <option value ="Standard">Standard</option>
        <option value ="Express">Express</option>
        <option value ="NextDay">Next Day</option>
        </select>       
   </div>
  );
};

export default ShippingMethodSelector;
