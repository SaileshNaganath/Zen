import { AppWrap,MotionWrap } from "../wrapper";
import '../styles/About.scss';
import images from "../assets/images";

const About = () => {
  return (
    <>
    <div className="about-container">
    <div className="left-container1">
    <div className="image-container">
    <img className='content-image' src={images.Meditation} alt='meditation'/>
    </div>
      
    </div>
   <div className="right-container1">
      <h1 className='section-heading'>
      <strong>
      Your Mental Health matter to us
      </strong>
      </h1>
      <p className="section-content">
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation tetuer. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation tetuer
      </p>
    </div>
    </div>
   
    </>
   
  )
}

export default AppWrap(MotionWrap(About,'app__about'),'about','app__primarybg');