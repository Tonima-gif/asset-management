import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { AuthContext } from "../Auth/AuthProvider";
import { format } from "date-fns";
import Swal from "sweetalert2";



const Allrequests = () => {
const axiosSecure = useAxiosSecure();
const [requests,setRequests]=useState([]);
const {user}=useContext(AuthContext)
const [search ,setSearch]=useState('');
const [reload ,setReload]=useState(false);


    useEffect(()=>{
axiosSecure.get(`/allRequestsForHr/${user?.email}?search=${search}`)
.then((res)=>{
    const data=res.data
    const notReturn=data.filter(item=>item.request!=='returned')
setRequests(notReturn)
})
.catch(err=>{
console.log(err);    
})
    },[axiosSecure,user,search,reload])


const handleApprovedButton =async(id,itemId)=>{
    setReload(false)
   await axiosSecure.patch(`/approved/${id}`,{itemId})
    .then(()=>{
setReload(true)
Swal.fire({
    title: "Approved",
    text: "Item approved",
    icon: "success"
  });
})
    .catch(err=>{
        Swal.fire({
                     title: `${err.message}`,
                     text: "something wrong",
                     icon: "warning"
                   });
    })
}
const handleRejectButton =async(id)=>{
    setReload(false)
   await axiosSecure.patch(`/reject/${id}`)
    .then(()=>{
setReload(true)
Swal.fire({
    title: "rejected",
    text: "Item request rejected",
    icon: "warning"
  });
})
    .catch(err=>{
        Swal.fire({
                     title: `${err.message}`,
                     text: "something wrong",
                     icon: "warning"
                   });
    })
}


    return (
        <div>
      <div className="flex flex-col md:flex-row md:gap-16 pt-28 pb-8">
            <h1 className="text-3xl font-bold">All Requests </h1>
            <div className="flex items-center gap-3">
            <div>
    <span className="text-lg text-gray-500 font-bold">Search</span>
 </div>
      <div>
      <label className="input input-bordered flex md:w-96 items-center gap-2">
 <input type="text" onChange={e=>setSearch(e.target.value)} className="grow" placeholder="Search requester email" />
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="h-4 w-4 opacity-70">
    <path
      fillRule="evenodd"
      d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
      clipRule="evenodd" />
  </svg>
</label>
      </div>
            </div>
      </div>
      
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-40">
       {requests.map(request=><div key={request._id} className="card z-0 bg-base-100 image-full md:w-96 shadow-xl">
  <figure>
    <img
      src={request?.itemPhoto}
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <p className="text-lg text-white font-bold shadow-xl"><span>Asset Name : </span>{request.itemName}</p>
    <p className="text-base text-white font-semibold shadow-sm"><span>Asset Type : </span>{request.itemType}</p>
    <p className="text-base text-white font-semibold shadow-sm"><span>Requester Name : </span>{request.requesterName}</p>
    <p className="text-base text-white font-semibold shadow-sm"><span>Requester Email : </span>{request.requesterEmail}</p>
    {request.requestDate&&<p className="text-base text-white font-semibold shadow-sm"><span>Request Date : </span>{format(request.requestDate,'dd-MM-yyyy')}</p>}
    <p className="text-base text-white font-semibold shadow-sm"><span>Request Status : </span>{request.status}</p>
 <div className="card-actions mt-5 justify-end">
      <button onClick={()=>handleApprovedButton(request._id,request.itemId)} disabled={request?.status==='approved'||request.status==='rejected'} className="btn bg-green-300">{request.status==='approved'?"Approved":"Approve"}</button>
      <button onClick={()=>handleRejectButton(request._id)} disabled={request.status==='approved'||request.status==='rejected'} className="btn bg-red-300">Reject</button>
    {request.status=='rejected'&&
     <button className="btn bg-gray-300 text-gray-400">Rejected</button>
    }
    </div>
  </div>
</div>)}
       </div>
        </div>
    );
};

export default Allrequests;
