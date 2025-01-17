import { useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useOneEmployee from "../Hooks/useOneEmployee";


const MyTeam = () => {

const axiosSecure=useAxiosSecure()
const [oneEmployee]=useOneEmployee()
const [employee ,setEmployee] =useState([])
useEffect(()=>{
axiosSecure.get(`/sameTeam/${oneEmployee?.HrEmail}`)
.then(res=>{
setEmployee(res?.data)
})
},[axiosSecure,oneEmployee])

    return (
        <div>
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
      </tr>)}
    </tbody>
  </table>
</div>
        </div>
    );
};

export default MyTeam;