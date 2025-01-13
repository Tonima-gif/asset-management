/* eslint-disable react/prop-types */
import { useContext } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import Loading from "./Loading";
import { Navigate, useLocation } from "react-router-dom";


const Private = ({children}) => {
const location =useLocation()
const {user ,loading}=useContext(AuthContext)

if(loading) return <Loading></Loading>
if(!user)return <Navigate state={{from:location.pathname}} to="/login"></Navigate>


else{
    return children
}

};

export default Private;