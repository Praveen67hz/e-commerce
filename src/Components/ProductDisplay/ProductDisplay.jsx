import  { useContext, useState } from "react";
import "./ProductDisplay.css";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";
import ImageZoom from "../ImageZoom/ImageZoom";
import { toast } from "react-toastify";

const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart } = useContext(ShopContext);
  const [selectedSize, setSelectedSize] = useState(null);

  if(!product) return null;
  
  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleAddToCart = () => {
    addToCart(product.id);
    toast.success("Added to Cart!");
  };

  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
        </div>

        <div className="productdisplay-img">
          <ImageZoom imageUrl={product.image} />
        </div>

      </div>

      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        
        <div className="productdisplay-right-stars">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(122)</p>
        </div>

        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">${product.old_price}</div>
          <div className="productdisplay-right-price-new">${product.new_price}</div>
        </div>

        <div className="productdisplay-right-description">
         A perfect blend of style and comfort, crafted from high-quality materials for a great fit and lasting wear.
        </div>


        <div className="productdisplay-right-size">
          <h1>Select Size</h1>

          <div className="productdisplay-right-sizes">
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <div
                key={size}
                className={selectedSize === size ? "selected" : ""}
                onClick={() => handleSizeSelect(size)}
                data-tooltip={`Size ${size} - Chest: ${size === "S" ? "36in" : size === "M" ? "38in" : size === "L" ? "40in" : size === "XL" ? "42in" : "44in"}, Length: 27in`}
              >
                {size}
              </div>
            ))}
          </div>
          
        </div>

        <button onClick={handleAddToCart}>ADD TO CART</button>

        <p className="productdisplay-right-category"><span>Category :</span> Women, T-Shirt, Crop Top</p>
        <p className="productdisplay-right-category"><span>Tags :</span> Modern, Latest</p>
      </div>
    </div>
  );
};

export default ProductDisplay;
