import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar.jsx'
import CanvasComponent from './components/CanvasComponent.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <CanvasComponent />
      {/* <p>asdasd</p> */}
    </>
  )
}

export default App
