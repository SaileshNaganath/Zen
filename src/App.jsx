
import './App.scss'
import About from './components/About'
import Features from './components/Features'
import Footer from './components/Footer'
import Hero from './components/Hero'
import NavBar from './components/NavBar'
import Outcome from './components/Outcome'
import Plans from './components/Plans'
import Subscribe from './components/Subscribe'

function App() {


  return (
    <div className='mainApp'>
      <NavBar/>
      <Hero/>
      <About/>
      <Features/>
      <Outcome/>
      <Plans/>
      <Subscribe/>
      <Footer/>
    </div>
  )
}

export default App
