import { AppWrap,MotionWrap } from "../wrapper";
import '../styles/Outcome.scss';


let outcomeDetail =[
  {
  id:1,
  heading:'65%',
  content:'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam.'
  },
  {
  id:2,
  heading:'52 million',
  content:'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam.'
  },
  {
   id:3, 
   heading:'89%',
   content:'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam.' 
  },

]
const Outcome = () => {
  return (
    <div className="outcome-container"> 
    <h1 className='section-heading'>
    <strong>
    Research Outcome
    </strong>
    </h1>
    <div className="outcomes">
    {outcomeDetail.map((item)=>(
      <>
        <div className="outcome__detail" key={item.id}>
          <p className="outcome__heading">{item.heading}</p>
          <p className="outcome__caption">{item.content}</p>
        </div>
      </>
    ))}
    </div>
    </div>
  )
}

export default AppWrap(MotionWrap(Outcome,'app__outcome'),'outcome','app__primarybg');