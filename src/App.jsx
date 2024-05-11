import { BrowserRouter,Routes,Route } from "react-router-dom";
import Landing from "./LandingPage";
import Beta from "./Beta";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import BoxBreathe from "./BoxBreathe";

function App() {


  return (
    <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/beta' element={<Beta/>}/>
        <Route path='/beta-feature' element={<BoxBreathe/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
