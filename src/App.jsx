import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar.jsx'
import ChessBackdrop from './components/ChessBackdrop.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <ChessBackdrop />
    </>
  )
}

export default App
