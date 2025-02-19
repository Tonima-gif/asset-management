        
import { useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { format } from "date-fns";
import useOneEmployee from "../Hooks/useOneEmployee";
import { useContext } from "react";
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { AuthContext } from "../Auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const MyRequests = () => {
const {user}=useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    const [oneEmployee]=useOneEmployee()
    const [assets ,setAssets]=useState([]);
    let [isOpen, setIsOpen] = useState(false)
    const [search ,setSearch]=useState('');
    const [sort ,setSort]=useState('');
    const navigate=useNavigate()

    useEffect(()=>{
        axiosSecure.get(`/employeeAssets/${oneEmployee?.HrEmail}?sort=${sort}&search=${search}`)
        .then(res=>{
        setAssets(res.data)
        })
        .catch(err=>{
          console.log(err);
        })
       
      },[axiosSecure,search,sort,oneEmployee])
   
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


    const handleAssetsRequests=(product)=>{       
            const itemName=product.productName
            const itemPhoto=product.productPhoto
            const itemId=product._id
            const itemHrEmail=product.addHrEmail
            const itemHrName=product.addHrName
            const itemType=product.productType
            const requesterEmail=user?.email
            const requesterName=user?.displayName
            const requesterPhoto=user?.photoURL
            const status='request'
            const requestDate=new Date()
            const approvalDate=''
            const itemInfo={
                itemName,itemPhoto,itemId,itemHrEmail,itemHrName,itemType,requestDate,approvalDate,requesterEmail,requesterName,requesterPhoto,status
            } 
             axiosSecure.post('/addRequests',itemInfo)
             .then(res=>{
                console.log(res);
             })
             .catch(err=>{
                console.log(err)
             })
              }

const handleShowModal=()=>{
 setIsOpen(false)
  Swal.fire({
             title: 'Request Send....',
             text: "Wait for your HR response",
             icon: "success"
           });
navigate('/requestedAssets')
}


    return (
        <div className="md:w-11/12 mx-auto">
        <div className="mb-36">
            <div className=" pt-28 pb-2 mb-14 flex flex-col sm:gap-y-4 md:flex-row justify-between items-center bg-white shadow-sm ">

            <h1 className="text-3xl font-bold">All Asset : {assets.length}</h1>
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
    <img className="w-full h-56 rounded-lg object-cover mb-4" src={asset.productPhoto} alt="" />
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
    {asset.productQuantity>0?<p className="text-base font-bold my-2">Available</p>
    :<p className="text-base font-bold my-2 text-red-500">Out-Of-Stock</p>
}
    <p className="text-base font-bold my-2">{format(asset.date,'dd-MM-yyyy')}</p>
      </div>
     </div>
    <div className="mt-4">
    {asset.productQuantity>0 ?<button onClick={()=>[handleAssetsRequests(asset),setIsOpen(true)]} className="btn bg-purple-400">send request</button>:
      <button disabled={true} className="btn bg-purple-300">Out-of-stock</button>
    }
    </div>

  </div>
</div>)}

<Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0  flex w-96 mx-auto items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 border bg-gray-200 shadow-xl bg-opacity-95 p-12">
            <DialogTitle className="font-bold">Additional Note</DialogTitle>
            <Description>You can Provide a additional note</Description>
           <input type="text" placeholder="Note" className="input input-bordered" />
            <div className="flex gap-4">
            <button onClick={() => handleShowModal()} className="btn bg-slate-400">request</button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

</div>
        </div>
        </div>
    );
};

export default MyRequests;