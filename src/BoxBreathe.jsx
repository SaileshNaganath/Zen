import './Landing.scss'
import { AppWrap,MotionWrap } from "./wrapper";
import BoxPage from './components/BoxPage'


function BoxBreathe() {


  return (
    <div className='mainApp'>
     
      <BoxPage/>
      
    </div>
  )
}

export default AppWrap(MotionWrap(BoxBreathe,'app__boxBreathe'),'boxBreathe','app__primarybg');