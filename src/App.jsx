import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar.jsx'
import CanvasComponent from './components/CanvasComponent.jsx'
import GamePage from './components/GamePage.jsx'
import { HashRouter as Router } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <CanvasComponent />
      <GamePage />
    </>
  )
}

export default App
