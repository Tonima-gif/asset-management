
import { Link, useNavigate } from "react-router-dom";
import register from "../assets/assets/authentication.gif"
import bg from "../assets/assets/authentication.png"
import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import Swal from "sweetalert2";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import GoogleLogin from "../Shared/GoogleLogin";
const Register = () => {

const {SignUp,updateUserProfile}=useContext(AuthContext);
const navigate = useNavigate();
const axiosPublic=useAxiosPublic();

const handleRegister = (e) =>{
e.preventDefault()
const form = e.target
const name = form.name.value
// const birth = form.birth.value
const photo = form.photo.value
const email = form.email.value
const password = form.password.value
const user={name,email}
// if(password.length<6){
//     return Swal.fire({
//        title: 'Something wrong!',
//        text: 'password must be contain at least 6 characters',
//        icon: 'error',
//        confirmButtonText: 'Try Again'
//      })
//    }
//    if(!/[a-z]/.test(password)){
//      return Swal.fire({
//        title: 'Something wrong!',
//        text: 'password must be contain at least one lowercase letter',
//        icon: 'error',
//        confirmButtonText: 'Try Again'
//      })
//    }
   
//    if(!/[A-Z]/.test(password)){
//      return Swal.fire({
//        title: 'Something wrong!',
//        text: 'password must be contain at least one Uppercase letter',
//        icon: 'error',
//        confirmButtonText: 'Try Again'
//      })
//    }
SignUp(email,password)
.then(async()=>{
 await updateUserProfile(name,photo)
  .then(async()=>{
await axiosPublic.post("/users",user)
.then((res)=>{
  console.log(res.data);
  if(res.data?.insertedId){
    Swal.fire({
      title: 'Register Successfully Complete!',
      text: 'Thank you for register',
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
         <>


        <div style={{backgroundImage:`url("${bg}")`}}>
        <h1 className="text-center text-4xl font-bold pt-20">Sign UP</h1>
         <div className="flex flex-col lg:flex-row-reverse justify-between items-center gap-10 py-5 w-full mx-auto mb-20"> 
                    <div>
        <img src={register} alt="" />
                    </div>
                    <div className="lg:mr-20 lg:w-1/2 card">
                    <GoogleLogin></GoogleLogin>
              <form onSubmit={ handleRegister } className="card-body">
            <div className="form-control">
         <label className="label">
         <span className="label-text font-bold">Name</span>
         </label>
         <input type="text" placeholder="name" name="name" className="input input-bordered" required />
         </div>
            <div className="form-control">
         <label className="label">
         <span className="label-text font-bold">Photo</span>
         </label>
         <input type="text" placeholder="photo" name="photo" className="input input-bordered" required/>
         </div>
            <div className="form-control">
         <label className="label">
         <span className="label-text font-bold">Date of Birth</span>
         </label>
         <input type="date" placeholder="date of birth" name="birth" className="input input-bordered" required/>
         </div>
            <div className="form-control">
         <label className="label">
         <span className="label-text font-bold">Email</span>
         </label>
         <input type="email" placeholder="Email" name="email" className="input input-bordered" required />
         </div>
         <div className="form-control">
         <label className="label"> <span className="label-text font-bold">Password</span>
         </label>
         <input type="password" placeholder="password" name="password" className="input input-bordered" required />
         </div>
         <input type="submit" className="btn w-full bg-orange-700/60 text-white font-bold mt-4" value="Sign Up" />
              </form>
              <p className="text-orange-700/60 font-semibold text-base text-center">Already Registered !! Go to <Link to="/login" className="text-black underline">Login</Link></p>
              
          </div>
            </div>
          </div>
         
         
         
         </>
    );
};

export default Register;