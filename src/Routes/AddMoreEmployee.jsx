import { Link, useNavigate } from 'react-router-dom';
import useAllUser from '../Hooks/useAllUser'
import useOneHr from '../Hooks/useOneHr';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../Auth/AuthProvider';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useState } from 'react';

const AddMoreEmployee = () => {
    const [allUser]=useAllUser()
    const [oneHr,refetch]=useOneHr()
const { user}=useContext(AuthContext)
const axiosSecure=useAxiosSecure()
const navigate=useNavigate()
const [disabled,setDisabled]=useState(false)



useEffect(()=>{
    if(oneHr?.addMember==0){
return setDisabled(true)
    }
    setDisabled(false)
},[oneHr?.addMember])

const handleAddEmployee=(member)=>{
const companyLogo=oneHr?.companyLogo
const companyName=oneHr?.companyName
const role='employee'
const HrEmail=user?.email
const employeeId=member._id
const infoOfEmployee={companyLogo,companyName,role,employeeId,HrEmail}
if(oneHr?.addMember>0){
    setDisabled(false)
    Swal.fire({
        title: "Are you sure? You want to allow this action",
        text: "You want to add the user your team !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, allow it!"
      }).then((result) => {
        if (result.isConfirmed) {
            axiosSecure.put(`/addEmployee/${member?._id}`,infoOfEmployee)
            .then(()=>{
                refetch()
                navigate('/myEmployee')
             Swal.fire({
                                  title: 'Employee added your team!',
                                  text: `successful to add employee`,
                                  icon: 'success',
                                  confirmButtonText: 'okay'
                                })
            
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
}

    return (
        <div>
            <div className='flex justify-between items-center md:mx-10 pt-28'>
                <p className='text-xl font-bold btn bg-slate-200'>Users : {allUser?.length}</p>
                <div className='flex flex-col gap-y-4'>
                <p className="text-xl font-bold btn bg-purple-100">Package Limit : {oneHr?.addMember}</p>
                <Link to='/increaseLimit' className='btn btn-sm bg-purple-300 w-fit mx-auto shadow-lg text-black text-base font-semibold'>Increase Limit</Link>
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-36'>
            {allUser.map((item,idx)=><div  key={idx}>
<div className='border-4 rounded-md bg-white shadow-lg p-2'>
    <div>
        <img className='w-28 h-28 mb-7 rounded-full object-cover' src={item.photo} referrerPolicy='no-referrer' alt="" />
    </div>
   <div className='flex justify-start items-center gap-2'>
        <p className='text-xl font-bold'>user name :</p>
        <p className='text-xl font-semibold'>{item?.name}</p>
    </div>
        <button disabled={disabled} onClick={()=>handleAddEmployee(item)} className='text-base font-semibold btn btn-sm mt-4 mb-2 btn-success bg-slate-50'>Add Team</button>
</div>
            </div>)}
            </div>
        </div>
    );
};

export default AddMoreEmployee;