import './Hero.css'
import hand_icon from '../Assets/hand_icon.png'
import arrow_icon from '../Assets/arrow.png'
import heroo_image from '../Assets/heroo_image.png'
const Hero = () => {
  return (
    <div className='hero'>
    <div className="hero-left">
    <h2>NEW ARRIVALS ONLY</h2>
    <div className="hero-hand-icon">
        <p>new</p>
        <img src= {hand_icon} alt=""/>
      </div>
      <p>collections</p>
      <p>for everyone</p>
    <div className="hero-latest-btn">
        <div>Latest Collection</div>
        <img src={arrow_icon} alt=""/>
    </div>
    </div>
      <div className="hero-right">
        <img src={heroo_image} alt=""/>
        </div>
        </div>
        
      
  )
}

export default Hero
