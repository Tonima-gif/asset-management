import { useContext } from "react";
import Banner from "../Pages/Banner";
import About from "./About";
import { AuthContext } from "../Auth/AuthProvider";
// import MyAssets from "../Pages/MyAssets";
// import MyTeam from "../Pages/MyTeam";
// import MyRequests from "../Pages/MyRequests";


const Home = () => {

    const {user} =useContext(AuthContext)

    return (
        <div>
            <Banner></Banner>
            <About></About>
            {user?.email&&<p className="text-3xl text-red-400 font-bold my-28">
              Please wait until your HR accepts you as <br></br>its employee or Contact your HR...
                </p>}
            {/* {<><MyAssets></MyAssets>
            <MyTeam></MyTeam>
            <MyRequests></MyRequests>
            </>} */}
        </div>
    );
};

export default Home;