import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../Auth/AuthProvider";
import useAxiosPublic from "../Hooks/useAxiosPublic";


const GoogleLogin = () => {
    const {handleGoogleSignIn}=useContext(AuthContext)
const navigate =useNavigate()
const axiosPublic =useAxiosPublic()

const handleGoogleSignUp =()=>{
    handleGoogleSignIn()
    .then((res)=>{
        console.log(res);
        const user={
            name:res?.user.displayName,
            email:res?.user.email,
            role:user
        }
        axiosPublic.post("/users",user)
        .then((res)=>{
            console.log("google to add user ==>",res.data);
            Swal.fire({
                title: 'Google Login successfully Done!',
                text: 'Thank you for Login',
                icon: 'success',
                confirmButtonText: 'okay'
              })
           navigate("/")
        })
        
    })
}

    return (
        <div>
         <div onClick={ handleGoogleSignUp} className="flex items-center justify-center mt-4 gap-2"> 
        <div>
        <img className="w-10 mx-auto" src="https://img.icons8.com/?size=48&id=17949&format=png" alt="" />
        </div>
        <span className="text-black font-bold">Google Login</span>
        </div>
        </div>
    );
};

export default GoogleLogin;