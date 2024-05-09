import { AppWrap,MotionWrap } from "../wrapper";
import '../styles/Features.scss';
import images from "../assets/images";

let featureDetail =[
  {
  img:images.feature1,
  content:'Guided Meditations for everyone'
  },
  {
  img:images.feature2,
  content:'Mindfulness & Meditation Exercises'
  },
  {
   img:images.feature3,
   content:'Soothing Sleep Music & Sounds' 
  },
  {
   img:images.feature4,
   content:'Track Daily Progress & Meditation Time'
  }
]
const Features = () => {
  return (
    <div className="feature-container"> 
    <h1 className='section-heading'>
    <strong>
    Features
    </strong>
    </h1>
    <div className="features">
    {featureDetail.map((item,index)=>(
      <>
        <div className='feature__detail' key={index}>
        <img src={item.img}/>
          <p className="feature__caption">{item.content}</p>
        </div>
      </>
    ))}
    </div>
   
    </div>
  )
}

export default AppWrap(MotionWrap(Features,'app__features'),'features','app__primarybg');