import {createContext, Dispatch, SetStateAction} from "react";
import {Socket} from "socket.io-client";

interface RoomContextType {
    room: string;
    setRoom: Dispatch<SetStateAction<string>>;
    joined: boolean;
    setJoined: Dispatch<SetStateAction<boolean>>;
    joinRoom: (room: string) => void;
    socket: Socket | null;
    roomID: number | null;
}

export const RoomContext = createContext<RoomContextType>({
    room: "",
    setRoom: () => { throw new Error("setRoom function not implemented") },
    joined: false,
    setJoined: () => { throw new Error("setJoined function not implemented") },
    joinRoom: () => { throw new Error("joinRoom function not implemented") },
    socket: null,
    roomID: null
});
