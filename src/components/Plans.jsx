import { AppWrap,MotionWrap } from "../wrapper"
import '../styles/Plans.scss';

let outcomeDetail =[
  {
  id:1,
  heading:'FREE',
  content1:'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam.',
  content2:'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam.',
  content3:'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam.',
  monthPrice:'0',
  yearPrice:'0',
  buttonName:'GET FREE'  
  },
  {
  id:2,
  heading:'LITE',
  content1:'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam.',
  content2:'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam.',
  content3:'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam.',
  monthPrice:'9',
  yearPrice:'100',
  buttonName:'BUY LITE'  
  },
  {
   id:3, 
   heading:'PRO',
   content1:'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam.',
  content2:'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam.',
  content3:'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam.',
  monthPrice:'20',
  yearPrice:'200',
  buttonName:'BUY PRO' 
  },

]
const Plans = () => {
  return (
    <div className="plan-container"> 
    <h1 className='section-heading'>
    <strong>
    Plans
    </strong>
    </h1>
    <div className="plans">
    {outcomeDetail.map((item)=>(
      <>
        <div className="plan__detail" key={item.id}>
          <p className="plan__heading">{item.heading}</p>
          <ul className="plan__list">
          <li className="plan__caption">{item.content1}</li>
          <li className="plan__caption">{item.content2}</li>
          <li className="plan__caption">{item.content3}</li>
          </ul>
          <p className='plan__monthPrice'>{item.monthPrice}$/month</p>
          <p className='plan__yearPrice'>{item.yearPrice}$/year</p>
          <button className='plan__button'>{item.buttonName}</button>
        </div>
      </>
    ))}
    </div>
    </div>
  )
}

export default AppWrap(MotionWrap(Plans,'app__plans'),'plans','app__primarybg');