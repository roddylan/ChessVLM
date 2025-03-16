import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar.jsx'
import CanvasComponent from './components/CanvasComponent.jsx'
import GamePage from './components/GamePage.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <CanvasComponent />
      {/* TODO: add chevron arrow to bottom (scroll indicator) */}
      <GamePage />
    </>
  )
}

export default App
