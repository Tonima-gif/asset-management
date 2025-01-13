import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Auth/AuthProvider";
import Swal from "sweetalert2";
import logo from "../assets/assets/logo.png"

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
    {user?<><Link to="/" className="text-base font-semibold md:mr-6">Home</Link>
      <Link to="/myAssets" className="text-base font-semibold md:mr-6">My assets</Link>
      <Link to="/myTeam" className="text-base font-semibold md:mr-6">My Team</Link>
      <Link to="/myRequest" className="text-base font-semibold md:mr-6">Requests</Link>
      <Link to="/myProfile" className="text-base font-semibold md:mr-6">Profile</Link>
    </>:<><Link to="/" className="text-base font-semibold md:mr-8">Home</Link>
      <Link to="/joinEmployee" className="text-base font-semibold md:mr-8">Join as Employee</Link>
      <Link to="/joinHr" className="text-base font-semibold md:mr-8">Join as HR Manager</Link>
      <Link to="/login" className="text-base font-semibold">Login</Link>
    </>}
    </>
)


    return (
        <div>
           <div className="navbar bg-white shadow-xl rounded-b-md fixed z-10 w-full md:w-11/12 mx-auto bg-opacity-90">
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