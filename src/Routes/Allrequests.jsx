import useAllUser from "../Hooks/useAllUser";


const Allrequests = () => {

    const [allUser]=useAllUser()

    return (
        <div>
            <h1 className="pt-28 text-3xl font-bold">All Requests : {allUser.length}</h1>
        </div>
    );
};

export default Allrequests;
