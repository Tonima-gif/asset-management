import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './Shared/Navbar'
import Footer from './Shared/Footer'

function App() {

  return (
    <>
     <Navbar></Navbar>
      <div>
        <div className='min-h-screen'>
        <Outlet></Outlet>
        </div>
        <Footer></Footer>
      </div>
    </>
  )
}

export default App
