import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext'
import { useContext } from 'react'
import remove_icon from '../Assets/cart_cross_icon.png'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const CartItems = () => {
    const{getTotalCartAmount,products,cartItems,removeFromCart}=useContext(ShopContext);
    const navigate = useNavigate();

const handleRemoveFromCart = (id) => {
removeFromCart(id);
toast.error("Removed from Cart!");
};

  return (
    <div className='cartitems'>
      <div className="cartitem-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr/>
      {products.map((e)=>{
        if(cartItems[e.id]>0)
        {
        return <div key={e.id}>
        <div className="cartitems-format cartitem-format-main">
            <img src={e.image} alt="" className='carticon-product-icon'/>
            <p className='cartitems-name'>{e.name}</p>
            <p className='cartitems-price'>${e.new_price}</p>
            <button className='cartitems-quantity'>{cartItems[e.id]}</button>
            <p className='cartitems-total'>${e.new_price*cartItems[e.id]}</p>
            <img className='cartItems-remove-icon'src={remove_icon} onClick={()=>handleRemoveFromCart(e.id)} alt="" />
        </div>
        <hr/>
      </div>
        }
        return null;
    })}
       <div className="cartitems-down">
        <div className="cartitems-totals">
           <h1>Subtotal</h1>
           <div>
            <div className="cartitems-total-item">
              <h3>Subtotal</h3>
              <h3>${getTotalCartAmount()}</h3>
            </div>
            <hr />
            <div>
              <button onClick={()=> navigate('/shipping')}>PROCEED TO SHIPPING</button>
            </div>
           </div>
        </div>
       </div>
    </div>
    
  )
}

export default CartItems
