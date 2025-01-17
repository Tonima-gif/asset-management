import { useContext } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const useOneEmployee = () => {
    const {user}=useContext(AuthContext)
    const axiosSecure=useAxiosSecure()
    
    const {data:oneEmployee=[],isPending:isOneEmployeeLoading,refetch}=useQuery({
        queryKey:['employee'],
        queryFn:async()=>{
            const res =await axiosSecure.get(`/oneEmployee/${user?.email}`)
            return res?.data
    
        }
    })
    return [oneEmployee,isOneEmployeeLoading,refetch]
};

export default useOneEmployee;