
import { AppWrap,MotionWrap } from "../wrapper";
import { Link } from "react-router-dom";
import '../styles/BetaAbout.scss';


const BetaAbout = () => {
  return (
    <>
    <div className="betaAbout-container">
    
        <div className="container1">
            <h1 className='section-heading'>
            <strong>
            Box-Breathing Technique 
            </strong>
            </h1>
            <p className="section-content-main">
Indulge in tranquility with our Box Breathing Technique. Inhale, hold, exhale, and repeat in a soothing square pattern to swiftly dispel stress. This ancient method not only calms the mind but also enhances focus and overall well-being.

Embrace its simplicity through our website&apos;s beta feature, offering instant access to serenity. Whether combating deadlines or daily pressures, empower yourself to overcome stress and flourish.

Witness the profound effects of mindful breathing as it dissolves tension, leaving you refreshed and revitalized. Bid adieu to racing thoughts and welcome mental clarity. Just minutes of practice daily can unlock a lifetime of inner peace.

Join countless individuals who have harnessed this transformative technique. Don&apos;t let stress dictate your life; seize control today with the Box Breathing Technique.
            </p>
        </div>

        <div className="container1">
            <h1 className='section-heading'>
            Try the Beta Feature
            </h1>
            <p className="section-content1">
            Check out the feature, please make sure your microphone permission is allowed before proceeding.
            </p>
            <div className="proceed-button">
            <Link to='/beta-feature'>
            <button className="secondary-button1">Proceed</button>
            </Link>
            </div>
            
        </div>
      

    </div>
   
    </>
   
  )
}

export default AppWrap(MotionWrap(BetaAbout,'app__betaAbout'),'betaAbout','app__primarybg');