import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import "react-datepicker/dist/react-datepicker.css";
import { useContext, useState } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import Swal from "sweetalert2";

const UpdateAsset = () => {
const {user}=useContext(AuthContext)
const {id} =useParams()
const axiosSecure=useAxiosSecure()
const [item,setItem]=useState({})
const navigate=useNavigate()
useEffect(()=>{
axiosSecure.get(`/update/${id}`)
.then(res=>{
   const data=res.data
setItem(data)
    })
    .catch(err=>{
      console.log(err);
    })
},[axiosSecure,id])


const handleAddAssets = (e)=>{
e.preventDefault()
const form = e.target
const productName = form.productName.value
const productPhoto = form.productPhoto.value
const productQuantity= parseFloat(form.productQuantity.value)
const productType= form.productType.value


const asset={productName,productPhoto,productQuantity,productType,requestNo:0,addHrEmail:user?.email,addHrPhoto:user?.photoURL,addHrName:user?.displayName}
console.log(asset);
axiosSecure.put(`/updateAsset/${id}`,asset)
.then(()=>{
    Swal.fire({
        title: 'Asset Updated Successfully!',
        text: 'asset Updated',
        icon: 'success',
        confirmButtonText: 'okay'
      })
   navigate("/assetsList") 
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
        <div>
<h1 className="text-center text-4xl font-bold pt-28">Update an Assets</h1>
         
            <div className="lg:mr-20 card py-8 mb-36">
      <form onSubmit={ handleAddAssets } className="card-body">
    <div className="flex flex-col w-full md:flex-row gap-6">

    <div className="form-control  lg:w-1/2">
 <label className="label">
 <span className="label-text font-bold">Product Name</span>
 </label>
 <input type="text" placeholder="Product Name" name="productName" className="input input-bordered" defaultValue={item.productName} />
 </div>
 <div className="form-control  lg:w-1/2">
 <label className="label"> <span className="label-text font-bold">Product Type</span>
 </label>
 <input type="text" placeholder="Product Type" name="productType" className="input input-bordered" defaultValue={item.productType}/>
 </div>
</div>
 <div className="flex flex-col w-full md:flex-row gap-6">
 <div className="form-control  lg:w-1/2">
 <label className="label"> <span className="label-text font-bold">Product Photo</span>
 </label>
 <input type="text" placeholder="Product Photo" name="productPhoto" className="input input-bordered" defaultValue={item.productPhoto} />
 </div>
 <div className="form-control  lg:w-1/2">
 <label className="label"> <span className="label-text font-bold">Product Quantity</span>
 </label>
 <input type="text" placeholder="Product Quantity" name="productQuantity" className="input input-bordered" defaultValue={item.productQuantity} />
 </div>
 </div>
 <input type="submit" className="btn w-full bg-purple-700/60 text-white font-bold mt-4" value="Update Asset" />
      </form>
    </div>
  </div>
    );
};

export default UpdateAsset;