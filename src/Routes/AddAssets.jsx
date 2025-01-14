import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import bg from "../assets/assets/authentication.png"
import { useContext, useState } from "react";
import { AuthContext } from "../Auth/AuthProvider";


// import Swal from "sweetalert2";

const AddAssets = () => {
    const {user}=useContext(AuthContext)
    // const navigate = useNavigate()
    const [startDate, setStartDate] = useState(new Date());

const handleAddAssets = (e)=>{
e.preventDefault()
const form = e.target
const productName = form.productName.value
const productPhoto = form.productPhoto.value
const productQuantity= parseFloat(form.productQuantity.value)
const productType= form.productType.value
const date= startDate


const asset={productName,productPhoto,productQuantity,productType,date ,addHrEmail:user?.email,addHrPhoto:user?.photoURL}
console.log(asset);
// handleSignIn(email,password)
// .then(()=>{
//     Swal.fire({
//         title: 'Login Successfully Complete!',
//         text: 'Welcome Back',
//         icon: 'success',
//         confirmButtonText: 'okay'
//       })
//    navigate("/") 
// })
// .catch(err=>{
//     Swal.fire({
//         title: `${err.message}`,
//         text: 'something went wrong',
//         icon: 'error',
//         confirmButtonText: 'Try Again'
//       })
// })
}


    return (
        <div style={{backgroundImage:`url("${bg}")`}}>
<h1 className="text-center text-4xl font-bold pt-28">Add An Assets</h1>
         
            <div className="lg:mr-20 card py-8 mb-36">
      <form onSubmit={ handleAddAssets } className="card-body">
    <div className="flex flex-col w-full md:flex-row gap-6">

    <div className="form-control  lg:w-1/2">
 <label className="label">
 <span className="label-text font-bold">Product Name</span>
 </label>
 <input type="text" placeholder="Product Name" name="productName" className="input input-bordered" required />
 </div>
 <div className="form-control  lg:w-1/2">
 <label className="label"> <span className="label-text font-bold">Product Type</span>
 </label>
 <input type="text" placeholder="Product Type" name="productType" className="input input-bordered" required />
 </div>
</div>
 <div className="flex flex-col w-full md:flex-row gap-6">
 <div className="form-control  lg:w-1/2">
 <label className="label"> <span className="label-text font-bold">Product Photo</span>
 </label>
 <input type="text" placeholder="Product Photo" name="productPhoto" className="input input-bordered" required />
 </div>
 <div className="form-control  lg:w-1/2">
 <label className="label"> <span className="label-text font-bold">Product Quantity</span>
 </label>
 <input type="text" placeholder="Product Quantity" name="productQuantity" className="input input-bordered" required />
 </div>
 </div>
 {/* date */}
 <div className="form-control w-1/3">
 <label className="label"> <span className="label-text font-bold">Date</span>
 </label>
 <DatePicker selected={startDate} className="input input-bordered  w-full" onChange={(date) => setStartDate(date)} />
 </div>
 <input type="submit" className="btn w-full bg-purple-700/60 text-white font-bold mt-4" value="Add Asset" />
      </form>
    </div>
  </div>
    );
};

export default AddAssets;