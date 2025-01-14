import useAllUser from "../Hooks/useAllUser";


const MyTeam = () => {

    const [allUsers]=useAllUser()
    return (
        <div>
            <h1 className="text-3xl py-10 font-bold">My Team</h1>
            <p>{allUsers.length}</p>
        </div>
    );
};

export default MyTeam;