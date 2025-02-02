import { useState } from 'react'
import ImageScreen from './components/ImageScreen'
import InstructionBar from './components/InstructionBar'
import Logo from './components/Logo'
import TutorialVid from './components/TutorialVid'
import UserCam from './components/UserCam'
import './index.css'

export default function App() {
var windowHeight = window.innerHeight;

  return (
    <div className="flex flex-col h-screen w-screen bg-[url('./assets/1-initial-state.png')] pl-0">
      <div className="flex flex-col items-center"> 
      <Logo className="z-0"/>
      <InstructionBar className="z-0" />
      </div>
      <div className='flex-grow flex items-center justify-center relative'>
      <ImageScreen className="z-0"/>
      <div className='absolute bottom-0 left-0 z-10'>
      {/* <UserCam className="z-1"/> */}
      </div>
      <div className='absolute bottom-0 right-0 z-10'>
      <TutorialVid className="z-1" />
      </div>
      </div>
    </div>

  )
}