import React from 'react'
import './DescriptionBox.css'
const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
       <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Description</div>
        <div className="descriptionbox-nav-box fade">Reviews (122)</div>
       </div>
       <div className="descriptionbox-description">
        <p>At [SHOPPER], we bring you a carefully curated collection of high-quality products designed to fit your lifestyle. Whether you're looking for the latest fashion, cutting-edge gadgets, or everyday essentials, we've got you covered.

Our platform is designed for effortless browsing, secure transactions, and a smooth shopping experience from start to finish. With trusted brands, competitive prices, and reliable delivery, we make sure you get what you need—when you need it.</p>
       </div>
    </div>
  )
}

export default DescriptionBox
