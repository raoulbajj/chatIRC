import {useState, ReactNode, useEffect} from 'react';
import {RoomContext} from "../context/RoomContext";

interface RoomProviderProps {
    children: ReactNode;
}

const RoomProvider = ({ children }: RoomProviderProps) => {
    const [room, setRoom] = useState("");
    const [joined, setJoined] = useState(false);

    useEffect(() => {
        if (joined) {
            document.title = `Sparks | ${room}`;
        }
        else {
            document.title = `Sparks`;
        }
    }, [room, joined]);

    return (
        <RoomContext.Provider value={{ room, setRoom, joined, setJoined }}>
            {children}
        </RoomContext.Provider>
    );
};

export default RoomProvider;
