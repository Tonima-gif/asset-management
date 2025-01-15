
import { useContext, useEffect, useRef, useState } from "react";
import bg from "../assets/assets/authentication.png"
import login from "../assets/assets/authentication2.png"
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import Swal from "sweetalert2";
import GoogleLogin from "../Shared/GoogleLogin";


const Login = () => {
    const {handleSignIn}=useContext(AuthContext)
    const navigate = useNavigate()
const location=useLocation()
const captchaRef =useRef(null);
const [disabled ,setDisabled]=useState(true)

useEffect(()=>{
    loadCaptchaEnginge(6);
},[])


const handleCaptchaValidated = ()=>{
const user_captcha = captchaRef.current.value

if(validateCaptcha(user_captcha)){
    setDisabled(false)
}
else{
    setDisabled(true)
}

}

const handleLogin = (e)=>{
e.preventDefault()
const form = e.target
const email = form.email.value
const password = form.password.value

const navigation=location.state?.form?.pathName || "/";

handleSignIn(email,password)
.then(()=>{
    Swal.fire({
        title: 'Login Successfully Complete!',
        text: 'Welcome Back',
        icon: 'success',
        confirmButtonText: 'okay'
      })
   navigate(navigation) 
})
.catch(err=>{
    Swal.fire({
        title: `${err.message}`,
        text: 'something went wrong',
        icon: 'error',
        confirmButtonText: 'Try Again'
      })
})
}


    return (
        <div style={{backgroundImage:`url("${bg}")`}}>
<h1 className="text-center text-4xl font-bold pt-20">Sign In</h1>
         
<div className="flex flex-col lg:flex-row justify-between items-center gap-10 py-5 w-full mx-auto mb-20"> 
            <div>
<img src={login} alt="" />
            </div>
            <div className="lg:mr-20 lg:w-1/2 card">
            <GoogleLogin></GoogleLogin>
      <form onSubmit={ handleLogin } className="card-body">
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
<div className="form-control"> <label className="label">
 <LoadCanvasTemplate/> </label>
<div className="flex items-center gap-2 justify-between">
<input type="text" ref={captchaRef} placeholder="Type the captcha above" name="captcha" className="input input-bordered lg:w-full" required />
<button onClick={handleCaptchaValidated} className="btn btn-xs bg-slate-600 text-white">Validated</button>
</div>
</div>
 <input disabled={disabled} type="submit" className="btn w-full bg-orange-700/60 text-white font-bold mt-4" value="Sign In" />
      </form>
      <p className="text-orange-700/60 font-semibold text-base text-center"> New Here !! Please <Link to="/register" className="text-black underline">Register</Link></p>
    </div>
  </div>
        </div>
    );
};

export default Login;