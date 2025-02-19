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
    { name: 'returnable', value: 300 },
    { name: 'non-Returnable', value: 400 },
  ];

    return (
        <div className="md:w-11/12 mx-auto">
<h1 className="text-3xl py-16 font-bold">Pending Requests..</h1>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
    
{requests.map(request=><div key={request._id} className="card border-2 rounded-lg bg-base-100 w-fit p-4 shadow-xl">
  <div className="card-body">
    <img className="w-36 h-28 object-cover rounded-full border-4" src={request.itemPhoto} alt="" />
    <h2 className="card-title  text-lg font-bold">{request.itemName}</h2>
    <p className="text-base font-semibold">Requester : <span>{request.requesterName}</span></p>
    <p  className="text-base font-semibold">Requester : <span>{request.requesterEmail}</span></p>
    <p  className="text-base font-semibold text-red-400 text-center"><span>{request.status}....</span></p>
  </div>
</div>)}
</div>


<h1 className="text-3xl py-16 font-bold">Top Most Requests Items</h1>
<div className="grid grid-cols-2 md:grid-cols-4 justify-center items-center gap-5">
{sortItem.map(item=><div key={item._id} className="indicator">
  <span className="indicator-item badge badge-success">{item.requestNo}</span>
  <div className="bg-base-100 shadow-lg p-3 w-60 border-4 rounded-lg place-items-center">
  <h1 className="text-base font-semibold text-gray-600 py-3"><span>Name : </span>{item.productName}</h1>
  <h1 className="text-base font-semibold text-gray-600"><span>Type: </span>{item.productType}</h1>
  </div>
</div>)}
</div>

<div>
    <h1 className="text-3xl font-bold pt-20 pb-16">Limited Stock Item</h1>
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
<div className="flex flex-col bg-white border-2 mt-16 mb-12 rounded-lg shadow-xl md:flex-row justify-center items-center">
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

<div className="">
  <h1 className="text-4xl font-bold py-3 text-black">Features</h1>
  <p className="text-base font-semibold text-gray-600 pb-14">Explore the best feature.</p>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center gap-5">
  <div className="bg-gray-700 bg-opacity-5 border-2 border-green-400 md:w-96 h-44 rounded-xl">
    <h1 className="text-gray-700 text-2xl font-bold text-center py-5">Secure Authentication</h1>
    <p className="text-sm text-gray-500 font-semibold text-center px-3">Ensure only authorized HR and team members can access the system.</p>
  </div>
  <div className="bg-gray-700 bg-opacity-5 border-2 border-pink-400  md:w-96 h-44 rounded-xl">
    <h1 className="text-gray-700 text-2xl font-bold  text-center py-5">Streamlined Requests</h1>
    <p className="text-sm text-gray-500 font-semibold text-center px-3">Manage employee requests for new or replacement assets efficiently.</p>
  </div>
  <div className="bg-gray-700 bg-opacity-5 border-2 border-purple-400  md:w-96 h-44 rounded-xl">
    <h1 className="text-gray-700 text-2xl font-bold text-center py-5">Smart Categorization</h1>
    <p className="text-sm text-gray-500 font-semibold text-center px-3">Easily manage returnable (laptops) and non-returnable (stationery) assets.</p>
  </div>
  <div className="bg-gray-700 bg-opacity-5 border-2 border-blue-400  md:w-96 h-44 rounded-xl">
    <h1 className="text-gray-700 text-2xl font-bold  text-center py-5">Secure Login</h1>
    <p className="text-sm text-gray-500 font-semibold text-center px-3">Ensure data safety with role-based authentication.</p>
  </div>
  <div className="bg-gray-700 bg-opacity-5 border-2 border-red-400  md:w-96 h-44 rounded-xl">
    <h1 className="text-gray-700 text-2xl font-bold text-center py-5">Simple Requests</h1>
    <p className="text-sm text-gray-500 font-semibold text-center px-3">Employees can request or replace items effortlessly.</p>
  </div>
  <div className="bg-gray-700 bg-opacity-5 border-2 border-green-400  md:w-96 h-44 rounded-xl">
    <h1 className="text-gray-700 text-2xl font-bold  text-center py-5">Anywhere, Anytime</h1>
    <p className="text-sm text-gray-500 font-semibold text-center px-3"> Fully responsive and secure.</p>
  </div>
</div>

</div>

<div>
  <h1 className="text-gray-900 font-bold text-center text-4xl py-20">Testimonials</h1>

<div className="flex flex-col lg:flex-row justify-center items-center gap-5 mb-28">
<div className="bg-gray-200 p-4 border-2 rounded-md">
  <h1 className="text-black text-2xl font-bold text-center py-4">Efficiency & Organization</h1>
  <p className="text-sm text-gray-500">This software completely transformed how we track company assets. From laptops to stationery, we now have a clear overview of everything. No more misplaced items or miscommunications its a game-changer for our HR processes </p>
  <h4 className="text-xl text-gray-800 font-bold py-4 text-center">— HR Manager, TechCorp Inc.</h4>
</div>
<div className="bg-gray-200 p-4 border-2 rounded-md">
  <h1 className="text-black text-2xl font-bold text-center py-4">Ease of Use</h1>
  <p className="text-sm text-gray-500">The intuitive interface makes asset tracking so simple, even for non-tech-savvy HR staff. Assigning returnable and non-returnable items has never been easier, and our audits are now stress-free!
  </p>
  <h4 className="text-xl text-gray-800 font-bold py-4 text-center">— Operations Head, Solutions</h4>
</div>
<div className="bg-gray-200 p-4 border-2 rounded-md">
  <h1 className="text-black text-2xl font-bold text-center py-4">Streamlined Management</h1>
  <p className="text-sm text-gray-500">Managing company assets used to be a nightmare, but this software made it effortless. We can now track both returnable and non-returnable items in real time, saving hours of manual work every week.</p>
  <h4 className="text-xl text-gray-800 font-bold py-4 text-center">— HR Specialist, InnovateTech Ltd.</h4>
</div>
</div>

</div>


        </div>
    );
};

export default PendingRequest;