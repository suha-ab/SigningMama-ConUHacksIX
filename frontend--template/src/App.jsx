import { useState } from 'react'
import ImageScreen from './components/ImageScreen'
import InstructionBar from './components/InstructionBar'
import Logo from './components/Logo'
import TutorialVid from './components/TutorialVid'
import UserCam from './components/UserCam'
import './index.css'

export default function App() {


  return (
    <div className="bg-blue-500">
    <ImageScreen />
    <UserCam/>
    <TutorialVid/>
    </div>

  )
}