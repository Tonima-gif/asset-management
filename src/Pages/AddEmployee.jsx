import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useOneHr from "../Hooks/useOneHr";
import { AuthContext } from "../Auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";




const AddEmployee = () => {
const stripe =useStripe()
const elements =useElements()
const [oneHr,refetch]=useOneHr()
const [error ,setError]=useState('')
const [client ,setClient]=useState('')
const setCount=parseInt(oneHr?.addMember)
const [member ,setMember]=useState(0)
const axiosSecure =useAxiosSecure()
const {user} =useContext(AuthContext)
const navigate =useNavigate()
useEffect(()=>{ 
  refetch()
if(member>0){
  axiosSecure.post('/create-payment-intent', {price :member})
  .then(res=>{
   setClient(res.data?.clientSecret)
  }
  )
}

},[axiosSecure,member,refetch])


const handleSubmit=async(e)=>{
    e.preventDefault();
    if (!stripe || !elements) {
        return;
      }

      const card = elements.getElement(CardElement);
  
      if (card == null) {
        return;
      }

   const {error,paymentMethod} =await stripe.createPaymentMethod({
    type:"card",
    card
   })   

   if(error){
    setError(error.message)
   }
   else{
    setError('')
    console.log(paymentMethod);
   }


   const {paymentIntent,error:confirmErr} =await stripe.confirmCardPayment(client,{
    payment_method:{
      card:card,
      billing_details:{
        email:user?.email || 'anonymous',
        name:user?.displayName || 'anonymous'
      }
    }
   })

   if(confirmErr){
    console.log("conform err" ,confirmErr);
   }
   else{
    axiosSecure.put(`/memberUpdate/${user?.email}?member=${member}`)
    .then((res)=>{
        console.log(res.data);
      refetch()
       Swal.fire({
                      title: 'Payment Successfully Done!',
                      text: `Package limit increased.`,
                      icon: 'success',
                      confirmButtonText: 'okay'
                    })
 navigate('/addEmployee')
    })
   console.log("payment intent",paymentIntent);
   }
}

const handleMember = (money)=>{
  refetch()
  const moneyChange=parseInt(setCount)
  const moneyChange2=parseInt(money)
  const count=moneyChange+moneyChange2
  setMember(count)
}


    return (
       <div>
        <div className="pt-28">
            <h1 className="text-3xl font-bold text-center mb-8 btn bg-purple-100">If you want to increase your package limit... Please pay !!</h1>
        </div>
        <div className="form-control md:w-1/2 my-5">
         <label className="label"> <span className="label-text font-bold">Select a Package</span>
         </label>
         <select onChange={(e)=>handleMember(e.target.value)} className="input input-bordered" required>
            <option value="0">Select a package</option>
            <option value="5">5 Members for $5</option>
            <option value="10">10 Members for $8</option>
            <option value="20">20 Members for $15</option>
         </select>
         </div>
        <div>
        <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '20px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button className="btn btn-sm btn-success my-6" type="submit" disabled={!stripe || !client ||member==0}>
        Pay
      </button>
      <p className="text-sm text-red-600 font-semibold">{error}</p>
    </form>
        </div>
       </div>
    );
};


export default AddEmployee;