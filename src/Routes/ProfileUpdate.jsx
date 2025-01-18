import { useContext } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


const ProfileUpdate = () => {

const {user,updateUserProfile}=useContext(AuthContext)
const navigate=useNavigate()
const handleUpdateProfile=(e)=>{
e.preventDefault()
const name=e.target.name.value
updateUserProfile(name,user?.photoURl)
.then(()=>{
    navigate('/')
    Swal.fire({
        title: "Profile successfully Updated",
        text: "profile updated",
        icon: "success"
      });
})
.catch(err=>{
    Swal.fire({
        title: `${err.message}`,
        text: "something wrong",
        icon: "error"
      });
})
}

    return (
        <div className="pt-20">
<h1 className="text-center py-6 text-3xl font-bold">Update Your profile</h1>
           <form onSubmit={handleUpdateProfile} className="card-body">
               <div className="flex flex-col w-full md:flex-row gap-6">
             <div className="form-control  lg:w-1/2">
            <label className="label">
            <span className="label-text font-bold">Full Name</span>
            </label>
            <input type="text" placeholder="Name" name="name" className="input input-bordered" defaultValue={user?.displayName}/>
            </div>
            <div className="form-control  lg:w-1/2">
            <label className="label"> <span className="label-text font-bold">Email</span>
            </label>
            <input type="text" placeholder="email" name="email" className="input input-bordered" value={user?.email} readOnly/>
            </div>
</div>
            <input type="submit" className="btn w-full bg-purple-700/60 text-white font-bold mt-4" value="Update Profile" />
                 </form> 
        </div>
    );
};

export default ProfileUpdate;