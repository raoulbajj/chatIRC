import { UserContext } from "../context/UserContext";
import { useState, ReactNode, useEffect } from "react";
import {Socket} from "socket.io-client";

interface UserProviderProps {
    children: ReactNode;
    socket: Socket;
}

const UserProvider = ({children, socket}: UserProviderProps) => {

    const [userID, setUserID] = useState<string|null>(null);
    const [username, setUsername] = useState<string|null>(null);

    useEffect(() => {

        socket.on('connect', () => {
            setUserID(socket.id);
            setUsername(socket.id);
        });

        return () => {
            socket.off('connect');
        };

    }, [socket]);

    const changeUsername = (username:string) => {
        setUsername(username);
    }

    return (
        <UserContext.Provider value={{userID, username, socket, changeUsername}}>
            {children}
        </UserContext.Provider>
    )
};

export default UserProvider;
