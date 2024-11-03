import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';

const Users = () => {
    const { socket } = useContext(UserContext);
    const [connectedUsers, setConnectedUsers] = useState([]);

    useEffect(() => {
        if (socket) {
            socket.on('update_users', (users) => {
                setConnectedUsers(users);
            });

            return () => {
                socket.off('update_users');
            };
        }
    }, [socket]);

    console.log("connectedUsers.length : " + connectedUsers.length);
    console.log(socket)

    return (
        <div className="flex-col text-xl h-[85vh] bg-base-200 m-3 w-[350px] border-2 border-secondary p-5 mt-5 rounded-xl text-center italic overflow-y-scroll truncate">
            USER'S IDs :
            <div className="divider"></div>
            {connectedUsers.map((user, index) => (
                <div className='text-green-400 text-sm' key={index}>
                    {user}
                    <div className='divider'></div>
                </div>
            ))}
        </div>
    );
};

export default Users;
