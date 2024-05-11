import { useState } from "react";
import images from "../assets/images";
import '../styles/NavBar.scss';
import { HiOutlineBars3 } from "react-icons/hi2";
import { HiMiniXMark } from "react-icons/hi2";

let navLinks =[
  {
  id:1,
  heading:'About',
  link:'#about'
  },
  {
  id:2,
  heading:'Features',
  link:'#features'
  },
  {
   id:3, 
   heading:'Outcomes',
   link:'#outcome'
  },
  {
    id:4, 
    heading:'Plans',
    link:'#plans'
   },
   {
    id:5, 
    heading:'Subscribe',
    link:'#subscribe'
   },


]
const NavBar = () => {
  const [open,setOpen] = useState(true);

  return (
    <>
<div className="navbar-container"> 
<nav className="navbar">
<span className='logo-container'>
   <img className='logo-img' src={images.Logo} alt='logo'/>
   <h1 className="logo-name">ZEN</h1>
    </span>
    <div onClick={()=>setOpen(!open)} className='menu'>
    {open ? <HiOutlineBars3 /> : <HiMiniXMark />}
    </div>
    <span className={`navbar_list ${open ? 'web': `mobile`}`}>
    {navLinks.map((item)=>(
    
        <div className="navbar__detail" key={item.id} onClick={()=>setOpen(!open)}>
          <a className="navbar__heading" href={item.link}>{item.heading}</a>
        </div>
    
    ))}
    </span>
</nav>
    
   
    </div>
   

    <div className='navbar-wave'>
    </div>
    </>
    
  )
}



export default NavBar