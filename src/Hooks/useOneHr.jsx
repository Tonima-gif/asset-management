import { useContext } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { AuthContext } from "../Auth/AuthProvider";
import { useQuery } from "@tanstack/react-query";


const useOneHr = () => {
    const {user}=useContext(AuthContext)
const axiosSecure=useAxiosSecure()

const {data:oneHr,refetch}=useQuery({
    queryKey:[user?.email ,'hr'],
    queryFn:async()=>{
        const res =await axiosSecure.get(`/hr/${user?.email}`)
        return res?.data

    }
})
return [oneHr,refetch]
};

export default useOneHr;