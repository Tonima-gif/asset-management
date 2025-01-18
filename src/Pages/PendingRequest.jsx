import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { AuthContext } from "../Auth/AuthProvider";
import { PieChart, Pie, Cell, Legend } from 'recharts';

const PendingRequest = () => {
    const axiosSecure = useAxiosSecure();
const {user}=useContext(AuthContext)
const [requests,setRequests]=useState([])
const [limited,setLimited]=useState([])
const [sortItem,setSortItem]=useState([])

 useEffect(()=>{
axiosSecure.get(`/allRequestsForHr/${user?.email}`)
.then((res)=>{
    const data=res.data
    const notReturn=data.filter(item=>item.status==='request')
setRequests(notReturn)
})
.catch(err=>{
console.log(err);    
})
    },[axiosSecure,user])


useEffect(()=>{
    axiosSecure.get(`/asset/${user?.email}`)
  .then(res=>{
    const data=res.data
    const limitItem=data.filter(limit=>limit.productQuantity<10);
  setLimited(limitItem)
  })
  .catch(err=>{
    console.log(err);
  })
},[axiosSecure,limited,user])
useEffect(()=>{
    axiosSecure.get(`/asset/${user?.email}`)
  .then(res=>{
    const data=res.data
    const limitItem=data.sort((a,b)=>b.requestNo - a.requestNo).splice(0,5)
  setSortItem(limitItem)
  })
  .catch(err=>{
    console.log(err);
  })
},[axiosSecure,user])


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const peiChartData = [
    { name: 'returnable', value: 400 },
    { name: 'non-Returnable', value: 300 },
  ];

    return (
        <div>
<h1 className="text-3xl py-24 font-bold">Pending Requests..</h1>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-10">
    
{requests.map(request=><div key={request._id} className="card bg-base-100 w-fit p-4 shadow-xl">
  <div className="card-body">
    <img className="w-36 h-36 object-cover rounded-full border-4" src={request.itemPhoto} alt="" />
    <h2 className="card-title  text-lg font-bold">{request.itemName}</h2>
    <p className="text-base font-semibold">Requester : <span>{request.requesterName}</span></p>
    <p  className="text-base font-semibold">Requester : <span>{request.requesterEmail}</span></p>
    <p  className="text-base font-semibold text-red-400 text-center"><span>{request.status}....</span></p>
  </div>
</div>)}
</div>


<h1 className="text-3xl py-16 font-bold">Top Most Requests Items</h1>
<div className="grid grid-cols-2 md:w-11/12 mx-auto md:grid-cols-4 justify-center items-center gap-5">
{sortItem.map(item=><div key={item._id} className="indicator">
  <span className="indicator-item badge badge-success">{item.requestNo}</span>
  <div className="bg-base-100 shadow-lg p-3 w-60 border-4 rounded-lg place-items-center">
  <h1 className="text-base font-semibold text-gray-600 py-3"><span>Name : </span>{item.productName}</h1>
  <h1 className="text-base font-semibold text-gray-600"><span>Type: </span>{item.productType}</h1>
  </div>
</div>)}
</div>

<div>
    <h1 className="text-3xl font-bold text-gray-600 py-16">Limited Stock Item</h1>
    <div className="collapse bg-purple-300 shadow-xl mb-10">
  <input type="checkbox" />
  <div className="collapse-title text-base font-semibold">Show Limited Stock Items</div>
  <div className="collapse-content">
  <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Quantity</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
    {limited.map(limit=> <tr key={limit._id}>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src={limit.productPhoto}
                  alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">{limit.productName}</div>
            </div>
          </div>
        </td>
        <td>
          {limit.productType}
        </td>
        <td>{limit.productQuantity}</td>
      </tr>)}
    </tbody>
  </table>
</div>
  </div>
</div>
</div>
<div className="flex flex-col bg-white border-2 mt-16 mb-12 rounded-lg shadow-xl md:flex-row md:w-10/12 justify-center items-center mx-auto">
 <div>
 <h1 className="text-2xl font-bold text-slate-500">Chart of total request items type</h1>
 </div>
<div>
<PieChart width={400} height={400}>
          <Pie
            data={peiChartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {peiChartData.map((entry,index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend></Legend>
        </PieChart>
</div>
</div>
        </div>
    );
};

export default PendingRequest;