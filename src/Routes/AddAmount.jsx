import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import AddEmployee from "../Pages/AddEmployee";


const AddAmount = () => {
  
    const stripePromise =loadStripe(import.meta.env.VITE_PAYMENT_PK)

    return (
        <div>
        <div className="md:w-10/12 mx-auto">
            <Elements stripe={stripePromise}>
             <AddEmployee></AddEmployee>
            </Elements>
        </div>
        </div>
    );
};


export default AddAmount;