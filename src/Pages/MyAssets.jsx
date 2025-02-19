import { useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { format } from "date-fns";
import { useContext } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const MyAssets = () => {
        

const {user}=useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    const [assets ,setAssets]=useState([]);
    const [search ,setSearch]=useState('');
    const [restart ,setRestart]=useState(false);
    useEffect(()=>{
        axiosSecure.get(`/employeeRequestsAssets/${user?.email}?search=${search}`)
        .then(res=>{
        setAssets(res.data)
        })
        .catch(err=>{
          console.log(err);
        })
       
      },[axiosSecure,search,user,restart])
   
      const handleFilter=(filter)=>{
        const data=assets.filter(asset=>asset.itemType==filter)
        console.log(data)
        setAssets(data)
        }
        const handleStock=(stock)=>{
          if(stock=="request"){
            const data=assets.filter(asset=>asset.status==='request')
            return setAssets(data)
          }
        const data=assets.filter(asset=>asset.status==='approved')
        setAssets(data)
        }

const handleRequestCancel=(id)=>{
Swal.fire({
    title: "Are you sure?",
    text: "You won't be cancel!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, cancel it!"
  }).then((result) => {
    if (result.isConfirmed) {
      axiosSecure.delete(`/requestDelete/${id}`)
      .then(()=>{
        const data=assets.filter(asset=>asset._id!==id)
        setAssets(data)
        Swal.fire({
          title: "Canceled!",
          text: "Your asset has been canceled.",
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

const handleRequestReturn=async(id)=>{
  setRestart(false)
   await axiosSecure.patch(`/requestReturn/${id}`)
    .then(()=>{
      setRestart(true)
        Swal.fire({
            title: 'Returned',
            text: "Item Returned",
            icon: "success"
          });
    })
    .catch((err=>{
        Swal.fire({
          title: `${err.message}`,
          text: "something wrong.",
          icon: "error"
        });
      }))
}
    return (
        <div>
          <Helmet>
    <title>My Assets</title>
</Helmet>
        <div className="mb-36 md:w-11/12 mx-auto">
            <div className=" pt-28 pb-2 mb-14 flex flex-col sm:gap-y-4 md:flex-row justify-between items-center bg-white shadow-sm ">

            <h1 className="text-3xl font-bold">All Asset : {assets.length}</h1>
            <div className="lg:w-1/4">
          <input type="search"onChange={e=>setSearch(e.target.value)} placeholder="Search" className="input input-bordered lg:w-full"/>
            </div>

            <div>
                <select  onChange={e=>handleStock(e.target.value)} className="text-lg font-semibold px-2 btn bg-purple-100 rounded-xl">
                    <option value="">Filter by status</option>
                    <option value="request">pending</option>
                    <option value="approved">approved</option>
                </select>
            </div>
            <div>
                <select onChange={e=>handleFilter(e.target.value)} className="text-lg font-semibold px-2 btn bg-purple-100 rounded-xl">
                    <option value="">Filter by Type</option>
                    <option value="returnable">returnable</option>
                    <option value="non-returnable">non-returnable</option>
                </select>
            </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {assets.map(asset=><div key={asset._id} className="bg-white shadow-xl p-4 rounded-lg">
  <div className="flex flex-col md:flex-row justify-center gap-2">
  
  <div>
  <img className="w-[75%] h-40 rounded-lg object-cover mb-4" src={asset.itemPhoto} alt="" />
  </div>
    <div className="flex flex-col border-t-4 py-4 border-b-4 md:flex-row  gap-2">
     <div>
        <p className="text-base font-bold my-2">Name :</p>
        <p className="text-base font-bold my-2">Type :</p>
        <p className="text-base font-bold my-2">Status :</p>
        <p className="text-base font-bold my-2">Request :</p>
        <p className="text-base font-bold my-2">Approval :</p>
      </div>
      <div>
      <h2 className="text-base font-bold my-2">{asset.itemName}</h2>
    <p className="text-base font-bold my-2">{asset.itemType}</p>
    {asset.status==="request"&&<p className="text-base text-red-400 font-bold my-2">Pending..</p>}
    {asset.status==="approved"&&<p className="text-base text-blue-400 font-bold my-2">Approved</p>}
    {asset.status==="rejected"&&  <p className="text-base font-bold my-2 text-yellow-300">Rejected...</p>}

   {asset.requestDate&& <p className="text-base font-bold my-2">{format(asset.requestDate,'dd/MM/yyyy')}</p>}
   {asset.approvalDate&& <p className="text-base font-bold my-2">{format(asset?.approvalDate,'dd/MM/yyyy')}</p>}
{asset.status=='request'&&<p>[ ]</p>}
{asset.status=='rejected'&&<p>[ ]</p>}
      </div>
     </div>
        </div>
    <div className="mt-4 flex gap-4 justify-end">
    {asset.status=='approved'&&asset.itemType==='returnable'&&<button onClick={()=>handleRequestReturn(asset.itemId)} disabled={asset?.request=='returned'} className="btn bg-red-200 text-red-700">{asset?.request==='returned'?"Returned":"Return"}</button>}
    {asset.status==='request' &&<button onClick={()=>handleRequestCancel(asset._id)} className="btn bg-purple-200">cancel</button>}
    {asset.status==='approved' && <Link to='/print'><button className="btn bg-green-200"><img src="https://img.icons8.com/?size=32&id=NfaKejBoUdem&format=gif" alt="" /></button></Link>}
  </div>
</div>)}
</div>
        </div>
        </div>
    );
};

export default MyAssets;