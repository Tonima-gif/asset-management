import Banner from "../Pages/Banner";
import About from "./About";
// import { useContext } from "react";
// import { AuthContext } from "../Auth/AuthProvider";
import useEmployee from "../Hooks/useEmployee";
// import MyAssets from "../Pages/MyAssets";
// import MyTeam from "../Pages/MyTeam";
// import MyRequests from "../Pages/MyRequests";


const Home = () => {

    // const {user} =useContext(AuthContext)
const [isEmployee]=useEmployee()
    return (
        <div>
            <Banner></Banner>
            <About></About>
            {isEmployee==false &&<p className="text-3xl text-red-400 font-bold my-28">
              Please wait until your HR accepts you as <br></br>an employee .... Or Contact your HR...
                </p>}
            {/* {<><MyAssets></MyAssets>
            <MyTeam></MyTeam>
            <MyRequests></MyRequests>
            </>} */}
        </div>
    );
};

export default Home;