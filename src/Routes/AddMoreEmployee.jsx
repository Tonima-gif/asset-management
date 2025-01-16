import { Link } from 'react-router-dom';
import useAllUser from '../Hooks/useAllUser'
import useOneHr from '../Hooks/useOneHr';

const AddMoreEmployee = () => {
    const [allUser]=useAllUser()
    const [oneHr]=useOneHr()
    return (
        <div>
            <div className='flex justify-between items-center md:mx-10 pt-28'>
                <p className='text-xl font-bold btn bg-slate-200'>Users : {allUser.length}</p>
                <div className='flex flex-col gap-y-4'>
                <p className="text-xl font-bold btn bg-purple-100">Package Limit : {oneHr?.addMember}</p>
                <Link to='/increaseLimit' className='btn btn-sm bg-purple-300 w-fit mx-auto shadow-lg text-black text-base font-semibold'>Increase Limit</Link>
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {allUser.map(member=><div key={member._id}>
<div className='border-4 rounded-md bg-white shadow-lg p-2'>
    <div>
        <img className='w-28 h-28 mb-7 rounded-full object-cover' src={member.photo} alt="" />
    </div>
   <div className='flex justify-start items-center gap-2'>
        <p className='text-xl font-bold'>user name :</p>
        <p className='text-xl font-semibold'>{member.name}</p>
    </div>
        <button className='text-base font-semibold btn btn-sm mt-4 btn-success bg-slate-50'>Add Team</button>
</div>
            </div>)}
            </div>
        </div>
    );
};

export default AddMoreEmployee;