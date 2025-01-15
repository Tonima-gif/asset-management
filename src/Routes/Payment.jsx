import { loadStripe } from "@stripe/stripe-js";
import useOneHr from "../Hooks/useOneHr";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "../Pages/CheckOutForm";


const Payment = () => {
    const [oneHr]=useOneHr()
  
    const stripePromise =loadStripe(import.meta.env.VITE_PAYMENT_PK)

    return (
        <div>
            <div className="pt-28">
            <h1 className="text-3xl font-bold text-center mb-8 btn bg-purple-100">Please Pay $ {oneHr?.pack}</h1>
        </div>
        <div className="md:w-10/12 mx-auto">
            <Elements stripe={stripePromise}>
             <CheckOutForm></CheckOutForm>
            </Elements>
        </div>
        </div>
    );
};

export default Payment;