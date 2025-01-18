import Banner from "../Pages/Banner";
import About from "./About";
import { useContext } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import useEmployee from "../Hooks/useEmployee";
import useIsAdmin from "../Hooks/useIsAdmin";
import PendingRequest from "../Pages/PendingRequest";


const Home = () => {

    const {user} =useContext(AuthContext)
const [isEmployee]=useEmployee()
const [isAdmin]=useIsAdmin()
    return (
        <div>
            <Banner></Banner>
            <About></About>
            {user?.email&&isEmployee==false&&isAdmin==false ?<p className="text-3xl text-red-400 font-bold my-28">
              Please wait until your HR accepts you as <br></br>an employee .... Or Contact your HR...
                </p>:<></>}
          {isAdmin&&<PendingRequest></PendingRequest>}
          {isEmployee&&<p>employee</p>}
        </div>
    );
};

export default Home;