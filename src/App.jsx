import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Dashboard from './Component/Dashboard'
import Navbar from './Component/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='Parent-Dash'>
      <Navbar/>
      <Dashboard/>
    </div>
  )
}

export default App
