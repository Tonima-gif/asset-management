import useOneHr from "../Hooks/useOneHr";


const Payment = () => {
    const [oneHr]=useOneHr()
    console.log(oneHr);
    return (
        <div className="pt-28">
            <h1 className="text-3xl font-bold text-center btn bg-purple-100">Please Pay $ {oneHr.pack}</h1>
        </div>
    );
};

export default Payment;