import { useContext, useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { ShopContext } from '../../Context/ShopContext';

const ThemeToggle = () => {
    const { darkMode, toggleDarkMode } = useContext(ShopContext);
  
    return (
      <div className={`toggle-switch ${darkMode ? 'dark' : ''}`} onClick={toggleDarkMode}>
        <span className="icon sun">🌞</span>
        <span className="icon moon">🌙</span>
        <div className={`toggle-knob ${darkMode ? 'dark' : ''}`}></div>
      </div>
    );
  };
  

const Navbar = () => {
    const [menu, setMenu] = useState("shop");
    const { getTotalCartItems, user, logoutUser } = useContext(ShopContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    const isAdmin = user?.isAdmin;

    const handleLogout = () => {
        logoutUser();
        setDropdownOpen(false);
        navigate('/');
    };


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <div className="navbar">
            <div className="nav-logo">
                <img src={logo} alt="logo" />
                <p>SHOPSY</p>
            </div>

          
            <ul className="nav-menu">
                <li onClick={() => setMenu("shop")}>
                    <Link to="/">Shop</Link> {menu === "shop"}
                </li>
                <li onClick={() => setMenu("womens")}>
                    <Link to="/womens">Women</Link> {menu === "womens"}
                </li>
                <li onClick={() => setMenu("mens")}>
                    <Link to="/mens">Men</Link> {menu === "mens" }
                </li>
                <li onClick={() => setMenu("kids")}>
                    <Link to="/kids">Kids</Link> {menu === "kids" }
                </li>

                {isAdmin && (
                    <li onClick={() => setMenu("addproduct")}>
                        <Link to="/admindashboard">Admin Dashboard</Link> {menu === "admindashboard" }
                    </li>
                )}
            </ul>

       
            <div className="nav-login-cart">
                <Link to="/cart">
                    <img src={cart_icon} alt="cart" />
                </Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>

                <div className="dropdown" ref={dropdownRef}>
               <button className="dropbtn" onClick={() => setDropdownOpen(!dropdownOpen)}>
               {user ? `${user.name} ▼` : "Account ▼"}
              </button>

         {dropdownOpen && (
         <div className="dropdown-menu">
            {user ? (
                <>
    
                    <button onClick={handleLogout} className="dropdown-item logout-btn">Logout</button>
                </>
            ) : (
                <>
                    <Link to="/login" className="dropdown-item">Login</Link>
                    <Link to="/signup" className="dropdown-item">Sign Up</Link>
                </>
            )}
        </div>
         )}
       </div>
       <ThemeToggle/>

       </div>
        </div>
    );
};

export default Navbar;
