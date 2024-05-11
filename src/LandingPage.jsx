import './Landing.scss'
import About from './components/About'
import Features from './components/Features'
import Hero from './components/Hero'
import Outcome from './components/Outcome'
import Plans from './components/Plans'
import Subscribe from './components/Subscribe'

function Landing() {


  return (
    <div className='mainApp'>
     
      <Hero/>
      <About/>
      <Features/>
      <Outcome/>
      <Plans/>
      <Subscribe/>
      
    </div>
  )
}

export default Landing
