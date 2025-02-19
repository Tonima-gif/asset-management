
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { AuthContext } from "../Auth/AuthProvider";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { format } from "date-fns";
const AssetsList = () => {
const {user}=useContext(AuthContext)
const axiosSecure = useAxiosSecure()
const [assets ,setAssets]=useState([]);
const [search ,setSearch]=useState('');
const [sort ,setSort]=useState('');



useEffect(()=>{
  axiosSecure.get(`/asset/${user?.email}?sort=${sort}&search=${search}`)
  .then(res=>{
  setAssets(res.data)
  })
  .catch(err=>{
    console.log(err);
  })
 
},[axiosSecure,search,sort,user?.email])


const handleFilter=(filter)=>{
const data=assets.filter(asset=>asset.productType==filter)
console.log(data)
setAssets(data)
}
const handleStock=(stock)=>{
  if(stock=="available"){
    const data=assets.filter(asset=>asset.productQuantity>0)
    return setAssets(data)
  }
const data=assets.filter(asset=>asset.productQuantity==0)
console.log(data)
setAssets(data)
}

const handleDeleteAssets=(idToDelete)=>{
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be delete!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      axiosSecure.delete(`/assetDelete/${idToDelete}`)
      .then(()=>{
        const data=assets.filter(asset=>asset._id!==idToDelete)
        setAssets(data)
        Swal.fire({
          title: "Deleted!",
          text: "Your asset has been deleted.",
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
        <div className="mb-36 md:w-11/12 mx-auto">
            <div className=" pt-28 pb-2 mb-14 flex flex-col sm:gap-y-4 md:flex-row justify-between items-center bg-white shadow-sm ">

            <h1 className="text-3xl font-bold">Asset Lists : {assets.length}</h1>
            <div className="lg:w-1/4">
          <input type="search"onChange={e=>setSearch(e.target.value)} placeholder="Search" className="input input-bordered lg:w-full"/>
            </div>

            <div>
                <select  onChange={e=>handleStock(e.target.value)} className="text-lg font-semibold px-2 btn bg-purple-100 rounded-xl">
                    <option value="">Filter by stock</option>
                    <option value="available">available</option>
                    <option value="out-of-stock">out-of-stock</option>
                </select>
            </div>
            <div>
                <select onChange={e=>handleFilter(e.target.value)} className="text-lg font-semibold px-2 btn bg-purple-100 rounded-xl">
                    <option value="">Filter by Type</option>
                    <option value="returnable">returnable</option>
                    <option value="non-returnable">non-returnable</option>
                </select>
            </div>
            <div>
                <select onChange={e=>setSort(e.target.value)} className="text-lg font-semibold px-2 btn bg-purple-100 rounded-xl">
                    <option value="">Sort by Quantity</option>
                    <option value="quantity">quantity</option>
                </select>
            </div>

            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  {assets.map(asset=><div key={asset._id} className="bg-white shadow-xl p-5 rounded-lg">
  <div>
    <img className="w-28 h-28 object-cover mb-4" src={asset.productPhoto} alt="" />
    <div className="flex flex-col border-t-4 py-4 border-b-4  md:flex-row  gap-10">
     <div>
        <p className="text-base font-bold my-2">Name : </p>
        <p className="text-base font-bold my-2">Type : </p>
        <p className="text-base font-bold my-2">Quantity :</p>
        <p className="text-base font-bold my-2">Date : </p>
      </div>
      <div>
      <h2 className="text-base font-bold my-2">{asset.productName}</h2>
    <p className="text-base font-bold my-2">{asset.productType}</p>
    <p className="text-base font-bold my-2">{asset.productQuantity}</p>
    <p className="text-base font-bold my-2">{format(asset.date,'dd-MM-yyyy')}</p>
      </div>
     </div>
    <div className="mt-4">
      <Link to={`/update/${asset._id}`}>
      <button className="btn mr-7 bg-purple-300">Update</button>
      </Link>
      <button onClick={()=>handleDeleteAssets(asset._id)} className="btn bg-red-300">Delete</button>
    </div>
  </div>
</div>)}
</div>
        </div>
    );
};

export default AssetsList;