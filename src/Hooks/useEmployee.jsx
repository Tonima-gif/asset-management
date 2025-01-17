import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../Auth/AuthProvider";


const useEmployee = () => {
    const axiosSecure=useAxiosSecure()
    const {user}=useContext(AuthContext)
    const {data : isEmployee,isPending:isEmployeeLoading,refetch}=useQuery({
        queryKey:['isEmployee'],
        queryFn:async()=>{
         const res= await axiosSecure.get(`/employee/${user?.email}`)
       return res.data?.employee
        }
    })
    return[isEmployee,isEmployeeLoading,refetch]
};

export default useEmployee;