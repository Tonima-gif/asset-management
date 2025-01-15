import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
// import useAxiosPublic from "./useAxiosPublic";


const useAllUser = () => {
   const axiosSecure = useAxiosSecure()
   const roleUser="user"
   const {data : allUsers =[]}=useQuery({
    queryKey:["allUsers"],
    queryFn:async()=>{
        const res = await axiosSecure.get(`/allUser/${roleUser}`)
        return res.data
    }
   })
   return [allUsers]
};

export default useAllUser;