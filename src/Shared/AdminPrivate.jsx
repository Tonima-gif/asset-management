/* eslint-disable react/prop-types */
import { useContext } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import useIsAdmin from "../Hooks/useIsAdmin";
import Loading from "./Loading";
import { Navigate } from "react-router-dom";


const AdminPrivate = ({children}) => {
    const{user,loading}=useContext(AuthContext)
    const [isAdminLoading,isAdmin]=useIsAdmin()
    if(loading || isAdminLoading) return <Loading></Loading>

if(!user || !isAdmin)return <Navigate to="/login"></Navigate>
    
return children
};

export default AdminPrivate;