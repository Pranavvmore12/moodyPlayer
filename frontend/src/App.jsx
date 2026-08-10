import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import CleanMoodDetector from './Components/CleanMoodDetector'
import Songs from './Components/songs'
function App() {
 

  return (
    <>
      <CleanMoodDetector />
      <Songs />
    </>
  )
}   

export default App
