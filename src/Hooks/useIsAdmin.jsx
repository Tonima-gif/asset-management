import { useContext } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const useIsAdmin = () => {
const {user}=useContext(AuthContext)
const axiosSecure=useAxiosSecure()

const {data : isAdmin}=useQuery({
    queryKey:[user?.email ,'isAdmin'],
    queryFn:async()=>{
        const res =await axiosSecure.get(`/admin/${user?.email}`)
        return res?.data?.admin
    }
})
return [isAdmin]
};

export default useIsAdmin;