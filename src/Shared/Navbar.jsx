import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../Auth/AuthProvider";
import Swal from "sweetalert2";
import logo from "../assets/assets/logo.png"
import "../App.css"
import useIsAdmin from "../Hooks/useIsAdmin";
const Navbar = () => {

  const {user,handleSignOut}=useContext(AuthContext)
const navigate =useNavigate()
const [isAdmin]=useIsAdmin()
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


{ isAdmin &&<><NavLink to="/" className="text-sm font-semibold md:mr-6">Home</NavLink>
      <NavLink to="/assetsList" className="text-sm font-semibold md:mr-6">Asset List</NavLink>
      <NavLink to="/addAssets" className="text-sm font-semibold md:mr-6">Add Asset</NavLink>
      <NavLink to="/allRequests" className="text-sm font-semibold md:mr-6">All Requests</NavLink>
      <NavLink to="/myEmployee" className="text-sm font-semibold md:mr-6">My Employees</NavLink>
      <NavLink to="/addEmployee" className="text-sm font-semibold md:mr-6">Add Employee</NavLink>
      <NavLink to="/myProfile" className="text-sm font-semibold md:mr-6">Profile</NavLink>
    </>}
{/* {isEmploye &&<><NavLink to="/" className="text-sm font-semibold md:mr-6">Home</NavLink>
      <NavLink to="/myAssets" className="text-sm font-semibold md:mr-6">My assets</NavLink>
      <NavLink to="/myTeam" className="text-sm font-semibold md:mr-6">My Team</NavLink>
      <NavLink to="/myRequest" className="text-sm font-semibold md:mr-6">Requests</NavLink>
      <NavLink to="/myProfile" className="text-sm font-semibold md:mr-6">Profile</NavLink>
    </>} */}


    {user&& isAdmin==false?<><NavLink to="/" className="text-base font-semibold md:mr-8">Home</NavLink>
      <NavLink to="/register" className="text-base font-semibold md:mr-8">Join as Employee</NavLink>
      <NavLink to="/registerAsHr" className="text-base font-semibold md:mr-8">Join as HR Manager</NavLink>
      <NavLink to="/login" className="text-base font-semibold">Login</NavLink>
    </>:<></>}
    {!user&&<><NavLink to="/" className="text-base font-semibold md:mr-8">Home</NavLink>
      <NavLink to="/register" className="text-base font-semibold md:mr-8">Join as Employee</NavLink>
      <NavLink to="/registerAsHr" className="text-base font-semibold md:mr-8">Join as HR Manager</NavLink>
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
  <button>
 {user&&isAdmin==false?<p title="Logo set after your HR accepts you" className="bg-gray-200 w-20 h-10 rounded-lg"><span className="loading loading-ring loading-xs mt-3"></span></p>:<img className="w-32 object-cover" src={logo} alt="" />}
  </button>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {navItem}
    </ul>
  </div>
  <div className="navbar-end">
   {user?<>
   <small className="text-sm font-semibold underline text-purple-800">{user?.displayName}</small>
   <img referrerPolicy="no-referrer" className="w-12 h-12 mx-2 object-cover rounded-full" src={user?.photoURL} alt="" />
    <button onClick={handleLogOutBtn} className="btn btn-info sm:btn-sm bg-purple-400">Log-out</button>
   </>:<>
   </>
   }
  </div>
</div> 
        </div>
    );
};

export default Navbar;