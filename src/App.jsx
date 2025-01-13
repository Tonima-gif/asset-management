import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './Shared/Navbar'
import Footer from './Shared/Footer'

function App() {

  return (
    <>
      <div className='w-11/12 mx-auto'>
        <Navbar></Navbar>
        <div className='min-h-screen'>
        <Outlet></Outlet>
        </div>
        <Footer></Footer>
      </div>
    </>
  )
}

export default App
