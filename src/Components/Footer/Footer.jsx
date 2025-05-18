import './Footer.css' 
import footer_logo from '../Assets/logo_big.png'
import instagram_icon from '../Assets/instagram_icon.png'
import pintester_icon from '../Assets/pintester_icon.png'
import whatsapp_icon from '../Assets/whatsapp_icon.png'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <div className='footer'>
        <div className="footer-logo">
            <img src={footer_logo}alt="" />
            <p>SHOPPER</p>
        </div>
        <ul className="footer-links">
            <li><Link to="/company">Company</Link></li>
            <li><Link to="/product">Products</Link></li>
            <li><Link to="/offices">Offices</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact-us">Contact</Link></li>
        </ul>


        <div className="footer-policies">
        <h4>Policies</h4>
        <ul>
          <li><Link to="/privacy-policy">Privacy Policy</Link></li>
          <li><Link to="/terms-and-conditions">Terms & Conditions</Link></li>
          <li><Link to="/cancellation-and-refund">Cancellation & Refund</Link></li>
          <li><Link to="/shipping-and-delivery">Shipping & Delivery</Link></li>
        </ul>
      </div>

        <div className="footer-social-icon">
            <div className="footer container">
                <img src={instagram_icon} alt="" />
            </div>
            <div className="footer container">
                <img src={pintester_icon} alt="" />
            </div>
            <div className="footer container">
                <img src={whatsapp_icon} alt="" />
            </div>
        </div>
        <div className="footer-copyright">
            <hr/>
            <p>Copyright @ 2025 - All Right Reserved.</p>
        </div>
    </div>
  )
}

export default Footer
