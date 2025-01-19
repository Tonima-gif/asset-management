import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { format } from "date-fns";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
const MyMonthly = () => {
    const {user}=useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    const [assets ,setAssets]=useState([]);
    const [month ,setMonth]=useState([]);
    const [value, onChange] = useState(new Date());

useEffect(()=>{
        axiosSecure.get(`/employeeRequestsAssets/${user?.email}`)
        .then(res=>{
            const data=res.data
            const pending=data.filter(item=>item.status==='request')
        setAssets(pending)
        })
        .catch(err=>{
          console.log(err);
        })
       
      },[axiosSecure,user])
   
useEffect(()=>{
  axiosSecure.get(`/sortRequest/${user?.email}`)
  .then(res=>{
  setMonth(res?.data)
  })
  .catch(err=>{
    console.log(err);
  })
 
},[axiosSecure,user])


    return (
        <div>
           <h1 className="text-3xl font-bold py-16">My Pending Requests</h1>
            <div className="overflow-x-auto border-2 rounded-md">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Photo , Name</th>
        <th>Type</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {assets.map((member,index)=><tr key={member._id}>
        <th>
     {index+1}
        </th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src={member.itemPhoto}
                  alt="product" />
              </div>
            </div>
            <div>
              <div className="font-bold">{member.itemName}</div>
              <div className="text-sm bg-purple-400 mt-2 text-purple-900 rounded-xl text-center">{member.role}</div>
            </div>
          </div>
        </td>
        <td>
        {member.itemType}
        </td>
        <td>
        {member.status}
        </td>
      </tr>)}
    </tbody>
  </table>
</div> 

<h1 className="text-3xl font-bold py-16">My Monthly Requests</h1>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {month.map(item=><div key={item._id} className="bg-purple-200 border-2 border-purple-500 p-4">
        <h1 className="text-2xl font-bold">{item.itemName}</h1>
        <h1 className="text-base font-semibold py-3">Type : {item.itemType}</h1>
        <h1 className="text-base font-semibold">Request Date : {format(item.requestDate,'dd-MM-yyyy')}</h1>
    </div>)}
</div>
<div className="py-16">
  
<div className="py-8 border-4 rounded-lg flex flex-col lg:flex-row gap-10 md:gap-20 justify-center items-center">
  <div>
    <h1 className="text-3xl font-bold">Calender</h1>
    <p className="text-sm font-semibold py-2 text-gray-600">Choose your current date</p>
  </div>
<Calendar onChange={onChange} value={value} />
</div>
</div>

<div>
  <div className="py-10 mb-16 md:px-16 bg-slate-200 border-2 rounded-xl">
    <img className="w-16 mx-auto" src="https://img.icons8.com/?size=48&id=qG05IuQtGU57&format=gif" alt="" />
    <h1 className="text-3xl font-bold pt-2 text-gray-900 text-center">General Announcement</h1>
    <p className="text-sm font-semibold text-center py-3">This is to inform all employees that the office will remain closed on [25/1/2025] due to [vacation]. <br></br>Normal operations will resume on [3/2/2025]. Please plan accordingly.</p>
  </div>
</div>

        </div>
    );
};

export default MyMonthly;