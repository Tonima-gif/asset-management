import { Link, useNavigate } from "react-router-dom";
import register from "../assets/assets/authentication.gif"
import bg from "../assets/assets/authentication.png"
import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import Swal from "sweetalert2";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const JoinAsHr = () => {


    const {SignUp,updateUserProfile}=useContext(AuthContext);
    const navigate = useNavigate();
    const axiosPublic=useAxiosPublic();
    const handleRegisterToHR = (e) =>{
    e.preventDefault()
    const form = e.target
    const name = form.name.value
    const photo = form.photo.value
    const birth = form.birth.value
    const companyName = form.companyName.value
    const companyLogo = form.companyLogo.value
    const pack= parseInt(form.pack.value)
    const email = form.email.value
    const password = form.password.value
    const userInfo={name,email,companyName,companyLogo,birth,pack,role:"HrAdmin"}
    SignUp(email,password)
    .then(async()=>{
     await updateUserProfile(name,photo)
      .then(async()=>{
    await axiosPublic.post("/hrAdmin",userInfo)
    .then((res)=>{
      if(res.data?.insertedId){
        Swal.fire({
          title: 'Register Successfully Complete!',
          text: `Now you are HR Manager in ${companyName} company`,
          icon: 'success',
          confirmButtonText: 'okay'
        })
     navigate("/") 
      }
    })
    .catch(err=>{
      console.log("err form user insert==>",err);
    })
      })
        
    })
    .catch(err=>{
      Swal.fire({
        title: `${err.message}`,
        text: 'Something went wrong',
        icon: 'error',
        confirmButtonText: 'okay'
      })
    })
    
    
    }


    return (
        <div style={{backgroundImage:`url("${bg}")`}}>
        <h1 className="text-center text-4xl font-bold pt-24">Join as HR Manager</h1>
         <div className="flex flex-col lg:flex-row-reverse justify-between items-center gap-10 py-5 w-full mx-auto mb-20"> 
                    <div>
        <img src={register} alt="" />
                    </div>
                    <div className="lg:mr-20 lg:w-2/3 card">
                    {/* <GoogleLogin></GoogleLogin> */}
              <form onSubmit={ handleRegisterToHR } className="card-body">
                <div className="flex flex-col md:flex-row gap-5">
{/* hr name */}
<div className="form-control md:w-1/2">
         <label className="label">
         <span className="label-text font-bold">Full Name</span>
         </label>
         <input type="text" placeholder="name" name="name" className="input input-bordered" required />
         </div>
         {/* photo */}
            <div className="form-control md:w-1/2">
         <label className="label">
         <span className="label-text font-bold">Photo Url</span>
         </label>
         <input type="text" placeholder="Profile photo url" name="photo" className="input input-bordered" required/>
         </div>
                </div>
        <div className="flex flex-col md:flex-row gap-5">

             {/* company logo */}
             <div className="form-control md:w-1/2">
         <label className="label">
         <span className="label-text font-bold">Company Logo</span>
         </label>
         <input type="text" placeholder="Company Logo" name="companyLogo" className="input input-bordered" required/>
         </div>
         {/* company name */}
         <div className="form-control md:w-1/2">
         <label className="label">
         <span className="label-text font-bold">Company Name</span>
         </label>
         <input type="text" placeholder="Company Name" name="companyName" className="input input-bordered" required/>
         </div>
        </div>
        <div className="flex flex-col md:flex-row gap-5">
                     {/* email */}
         <div className="form-control md:w-1/2">
         <label className="label">
         <span className="label-text font-bold">Email</span>
         </label>
         <input type="email" placeholder="Email" name="email" className="input input-bordered" required />
         </div>
             {/* password */}
         <div className="form-control md:w-1/2">
         <label className="label"> <span className="label-text font-bold">Password</span>
         </label>
         <input type="password" placeholder="password" name="password" className="input input-bordered" required />
         </div>
        </div>
  <div className="flex flex-col md:flex-row gap-5">
          
{/* date of birth */}
<div className="form-control md:w-1/2">
         <label className="label">
         <span className="label-text font-bold">Date of Birth</span>
         </label>
         <input type="date" placeholder="date of birth" name="birth" className="input input-bordered" required/>
         </div>
          {/* packages */}

          <div className="form-control md:w-1/2">
         <label className="label"> <span className="label-text font-bold">Select a Package</span>
         </label>
         <select name="pack" className="input input-bordered" required>
            <option value="">Select a package</option>
            <option value="5">5 Members for $5</option>
            <option value="8">10 Members for $8</option>
            <option value="15">20 Members for $15</option>
         </select>
         </div>
  </div>
         <input type="submit" className="btn w-full bg-orange-700/60 text-white font-bold mt-4" value="Sign Up" />
              </form>
              <p className="text-orange-700/60 font-semibold text-base text-center">Already Registered !! Go to <Link to="/login" className="text-black underline">Login</Link></p>
              
          </div>
            </div>
          </div>
    );
};

export default JoinAsHr;