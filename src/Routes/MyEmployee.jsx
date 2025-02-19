import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { AuthContext } from "../Auth/AuthProvider";
import Swal from "sweetalert2";


const MyEmployee = () => {
const axiosSecure=useAxiosSecure()
const {user}=useContext(AuthContext)
const [employee ,setEmployee] =useState([])
useEffect(()=>{
axiosSecure.get(`/employeeInfo/${user?.email}`)
.then(res=>{
setEmployee(res?.data)
})
},[axiosSecure,user?.email])


const handleEmployeeRemove=(id)=>{
 const emailQuery=user?.email
    Swal.fire({
        title: "Are you sure?",
        text: "You want to remove the member in your team!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, remove!"
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSecure.patch(`/employeeDelete/${id}`,{emailQuery})
          .then(()=>{
            const data=employee.filter(asset=>asset._id!==id)
            setEmployee(data)
            Swal.fire({
              title: "Deleted!",
              text: "Member removed in your team",
              icon: "success"
            });
          })
          .catch(err=>{
            Swal.fire({
              title: `${err.message}`,
              text: "something wrong.",
              icon: "error"
            });
          })
        }
      });
}

    return (
        <div className=" md:w-11/12 mx-auto">
<h1 className="text-3xl font-bold pt-28 py-12">Employee : {employee?.length}</h1>
            <div className="overflow-x-auto border-2 rounded-md">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>
        </th>
        <th>Name</th>
        <th>Email</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {employee.map((member,index)=><tr key={member._id}>
        <th>
     {index+1}
        </th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src={member.photo}
                  alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">{member.name}</div>
              <div className="text-sm bg-purple-400 mt-2 text-purple-900 rounded-xl text-center">{member.role}</div>
            </div>
          </div>
        </td>
        <td>
        {member.email}
        </td>
        <th>
          <button onClick={()=>handleEmployeeRemove(member._id)} className="btn bg-red-300 btn-xs">Remove</button>
        </th>
      </tr>)}
    </tbody>
  </table>
</div>
        </div>
    );
};

export default MyEmployee;
