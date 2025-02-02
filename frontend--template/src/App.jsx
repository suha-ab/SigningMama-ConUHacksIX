import { useEffect, useState } from 'react'
import ImageScreen from './components/ImageScreen'
import InstructionBar from './components/InstructionBar'
import Logo from './components/Logo'
import TutorialVid from './components/TutorialVid'
import UserCam from './components/UserCam'
import './index.css'
import axios from 'axios'

export default function App() {
var windowHeight = window.innerHeight;

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/backend_app/recognitionModel');
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
    fetchData();
  console.log("called api")
}, []);

  return (
    <div className="flex flex-col h-screen w-screen bg-amber-200 pl-0">
      <div className="flex flex-row justify-between items-center"> 
      <Logo className="ml-auto z-0"/>
      <div className='pt-5 flex-grow flex justify-center items-center'>
        <InstructionBar className="z-0 m-10" />
      </div>
      </div>
      <div className='flex-grow flex items-start justify-center relative mt-25'>
      <ImageScreen urlID={4} className="z-0"/>
      <div className='absolute bottom-0 left-0 z-10 '>
      {/* <UserCam className="z-1"/> */}
      </div>
      <div className='absolute bottom-0 right-0 z-10'>  
      <TutorialVid className="z-1" />
      </div>
      </div>
    </div>
  )
}