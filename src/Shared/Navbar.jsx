import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../Auth/AuthProvider";
import Swal from "sweetalert2";
import logo from "../assets/assets/logo.png"
import "../App.css"
const Navbar = () => {

  const {user,handleSignOut}=useContext(AuthContext)
const navigate =useNavigate()

const handleLogOutBtn=()=>{
  handleSignOut()
  .then(()=>{
     Swal.fire({
          title: 'Log-out!',
          text: 'You are Log-out',
          icon: 'info',
          confirmButtonText: 'okay'
        })
     navigate("/") 
  })
}


const navItem=(
    <>
    {user?<><NavLink to="/" className="text-base font-semibold md:mr-6">Home</NavLink>
      <NavLink to="/myAssets" className="text-base font-semibold md:mr-6">My assets</NavLink>
      <NavLink to="/myTeam" className="text-base font-semibold md:mr-6">My Team</NavLink>
      <NavLink to="/myRequest" className="text-base font-semibold md:mr-6">Requests</NavLink>
      <NavLink to="/myProfile" className="text-base font-semibold md:mr-6">Profile</NavLink>
    </>:<><NavLink to="/" className="text-base font-semibold md:mr-8">Home</NavLink>
      <NavLink to="/joinEmployee" className="text-base font-semibold md:mr-8">Join as Employee</NavLink>
      <NavLink to="/joinHr" className="text-base font-semibold md:mr-8">Join as HR Manager</NavLink>
      <NavLink to="/login" className="text-base font-semibold">Login</NavLink>
    </>}
    </>
)


    return (
        <div>
           <div className="navbar bg-white shadow-xl rounded-b-md fixed z-10 w-full md:w-11/12 mx-auto">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
       {navItem}
      </ul>
    </div>
   <img className="w-32 object-cover" src={logo} alt="" />
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {navItem}
    </ul>
  </div>
  <div className="navbar-end">
   {user?<>
   <img className="w-14 rounded-full" src={user?.photoURL} alt="" />
    <button onClick={handleLogOutBtn} className="btn">Log-out</button>
   </>:<>
   </>
   }
  </div>
</div> 
        </div>
    );
};

export default Navbar;