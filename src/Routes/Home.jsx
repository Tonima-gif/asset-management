import Banner from "../Pages/Banner";
import About from "./About";
import { useContext } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import useEmployee from "../Hooks/useEmployee";
import useIsAdmin from "../Hooks/useIsAdmin";
import PendingRequest from "../Pages/PendingRequest";
import MyMonthly from "./MyMonthly";
import { Helmet } from "react-helmet";


const Home = () => {

    const {user} =useContext(AuthContext)
const [isEmployee]=useEmployee()
const [isAdmin]=useIsAdmin()
    return (
        <div>
        <Helmet>
    <title>Assets | Home</title>
</Helmet>
            <Banner></Banner>
            <About></About>
            {user?.email&&isEmployee==false&&isAdmin==false ?<p className="text-3xl text-red-400 font-bold my-28">
              Please wait until your HR accepts you as <br></br>an employee .... Or Contact your HR...
                </p>:<></>}
          {isAdmin&&<PendingRequest></PendingRequest>}
          {isEmployee&&<MyMonthly></MyMonthly>}
        </div>
    );
};

export default Home;