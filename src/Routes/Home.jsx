import { useContext } from "react";
import Banner from "../Pages/Banner";
import About from "./About";
import { AuthContext } from "../Auth/AuthProvider";
import MyAssets from "../Pages/MyAssets";
import MyTeam from "../Pages/MyTeam";
import MyRequests from "../Pages/MyRequests";


const Home = () => {

    const {user} =useContext(AuthContext)

    return (
        <div>
            <Banner></Banner>
            <About></About>
            {user?.email&&<><MyAssets></MyAssets>
            <MyTeam></MyTeam>
            <MyRequests></MyRequests>
            </>}
        </div>
    );
};

export default Home;