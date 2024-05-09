import { AppWrap,MotionWrap } from "../wrapper"
import '../styles/Subscribe.scss';
const Subscribe = () => {
  return (
    <div>
    <h1 className='section-heading'>
    <strong>
    Subscribe for tips and tricks ;)
    </strong>
    </h1>
    <form className="subscribe-form">
        <label className='form-label'>First Name</label>
        <input className='form-input'/>
        <label className='form-label'>Last Name</label>
        <input className='form-input'/>
        <label className='form-label'>Email</label>
        <input className='form-input'/>
        <div className="checkbox">
        <input type='checkbox' name='mail'/> <label htmlFor='mail' className="checkbox-label"> I Agree to the <span>Privacy Policy</span></label>
        </div>
        <button className="subscribe-button">SUBSCRIBE</button>
    </form>
    </div>
  )
}

export default AppWrap(MotionWrap(Subscribe,'app__subscribe'),'subscribe','app__primarybg');