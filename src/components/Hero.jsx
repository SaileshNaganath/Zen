import { AppWrap,MotionWrap } from "../wrapper";
import { Link } from "react-router-dom";
import '../styles/Hero.scss';
import images from "../assets/images";
const Hero = () => {
  return (
    <>
    <div className="hero-container">
    <div className="left-container">
      <h1 className='section-heading'>
      <strong>
      Find your Zen zone
      </strong>
      </h1>
      <p className="section-content">
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum
      </p>
      <div className="button-group">
      
      <button className="primary-button">
        DOWNLOAD APP
      </button>

      <Link to='/beta'>
      <button className="secondary-button">
        TRY BETA FEATURE
      </button>
      </Link> 

      </div>
     
    </div>
    <div className="right-container">
      <img className='hero-img' src={images.Mobile} alt='mobile'/>
    </div>
    </div>
    </>
    
  )
}

export default AppWrap(MotionWrap(Hero,'app__hero'),'hero','app__primarybg');