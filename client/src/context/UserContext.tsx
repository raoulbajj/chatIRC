import { createContext } from "react";
import { Socket } from "socket.io-client";

interface UserContextType {
    userID: string | null;
    username: string | null;
    socket: Socket | null;
    changeUsername: (username: string) => void;
}

export const UserContext = createContext<UserContextType>({
    userID: null,
    username: null,
    socket: null,
    changeUsername: () => { throw new Error("changeUsername function not implemented") },
});