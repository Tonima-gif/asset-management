
import { format } from "date-fns";
import useOneEmployee from "../Hooks/useOneEmployee";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";




const PrintPage = () => {

const [oneEmployee]=useOneEmployee()

    return (

 <>

<Helmet>
    <title>Assets | print</title>
</Helmet>

<div className="pt-28 flex flex-col justify-center items-center mb-20">
<div className="flex justify-center items-center md:gap-10 mb-4">
<img className="w-20 h-16" src={oneEmployee.companyLogo} alt="" />
<p className="text-xl font-bold">{oneEmployee.companyName}</p>
</div>
<div className="min-h[400px]">
<textarea placeholder="Details" className="border-2 p-2" cols="100" rows="15"></textarea>
</div>
<div className="flex gap-10 items-center mt-3">
<p className="text-base font-semibold">{format(new Date(),'dd/MM/yyyy')}</p>
<Link to='/requestedAssets' className="btn bg-purple-300">Done</Link>
</div>
</div>
 </>
)}
export default PrintPage;