import React, { useContext } from 'react'
import { useState } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
const Navbar = () => {
    const[menu,setMenu]=useState("shop");
    const{getTotalCartItems,user,logoutUser}=useContext(ShopContext);
    const[dropdownopen,setDropdownOpen] = useState(false);
  
    return (
    <div className="navbar">
    <div className="nav-logo">
    <img src={logo} alt="logo"/>
    <p>SHOPPER</p>
    </div>

    <ul className="nav-menu">
        <li onClick={()=>{setMenu("shop")}}><Link style={{textDecoration:'none'}} to='/'>Shop</Link>{menu==="shop" && <hr/>}</li>
        <li onClick={()=>{setMenu("mens")}}><Link style={{textDecoration:'none'}} to='/mens'>Men</Link>{menu==="mens" && <hr/>}</li>
        <li onClick={()=>{setMenu("womens")}}><Link style={{textDecoration:'none'}} to='/womens'>Women</Link>{menu==="womens" && <hr/>}</li>
        <li onClick={()=>{setMenu("kids")}}><Link style={{textDecoration:'none'}} to='/kids'>Kids</Link>{menu==="kids" && <hr/>}</li>
    </ul>

    <div className="nav-login-cart">
    <Link to='/cart'>
    <img src={cart_icon} alt="cart"/>
    </Link>
    
    <div className="nav-cart-count">{getTotalCartItems()}</div>

    <div className="dropdown">
      <button  onClick ={()=>setDropdownOpen(!dropdownopen)} className='dropbtn'>
     {user ? user.name: "Account ▼"}
      </button>
    
    {dropdownopen && (
     <div className="dropdown-menu">
      {user? (
        <>
        <button onClick ={logoutUser} className="dropdown-item">Logout</button>
        </>
      ):(
        <>
        <Link to ="/login" className='dropdown-item'>Login</Link>
        <Link to ="/signup" className='dropdown-item'>Signup</Link>
        </>
      )}
     </div>
    )}
    </div>
    </div>
    </div>
  )
}

export default Navbar;
