import { useEffect, useState } from 'react'
import ImageScreen from './components/ImageScreen'
import InstructionBar from './components/InstructionBar'
import Logo from './components/Logo'
import TutorialVid from './components/TutorialVid'
import UserCam from './components/UserCam'
import './index.css'
import axios from 'axios'

export default function App() {
  const labels = ['crack', 'mix', 'pour', 'cook', 'congrats'];


var windowHeight = window.innerHeight;
const [prediction, setPrediction] = useState(0);

// PLAN A: OPENCV
// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const response = await axios.post('http://127.0.0.1:8000/backend_app/recognitionModel');

//       // Handle prediction
//       if(response.data.prediction) {setPrediction(prediction+1)}
//       console.log(prediction)
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };
//     fetchData();
//   console.log("called api")
// }, []);

// PLAN B: INTERACTIVE
useEffect(() => {
  const interval = setInterval(() => {
    setPrediction(prevPrediction => (prevPrediction + 1) % labels.length);
  }, 5000); // Change prediction every 10 seconds

  return () => clearInterval(interval); // Cleanup interval on component unmount
}, [labels.length]);
// Reset game
// setPrediction(0)
// window.location.reload()

  return (
    <div className="flex flex-col h-screen w-screen bg-amber-200 pl-0">
      <div className="flex flex-row justify-between items-center"> 
      <Logo className="ml-auto z-0"/>
      <div className='pt-5 flex-grow flex justify-center items-center'>
        <InstructionBar prediction={prediction} className="z-0 m-10" />
      </div>
      </div>
      <div className='flex-grow flex-row flex items-start justify-center relative mt-25'>
      <ImageScreen urlID={prediction} className="z-0"/>
      <div className='absolute bottom-0 left-0 z-10 '>
      <UserCam className="z-10"/>
      </div>
      <div className='absolute bottom-0 right-0 z-10'>  
      <TutorialVid option={prediction} className=" z-1" />
      </div>
      </div>
    </div>
  )
}