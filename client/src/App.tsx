import Navbar from "./component/navbar/Navbar.tsx";
import Chat from "./component/chat/Chat.tsx";
import Channel from "./component/channel/Channel.tsx";
import Users from "./component/users/Users.tsx";
import UserProvider from "./provider/UserProvider.tsx";
import {io, Socket} from "socket.io-client";
import RoomProvider from "./provider/RoomProvider.tsx";

const socket: Socket = io("http://localhost:3000");

const App = () => {

    return (
        <UserProvider socket={socket}>
            <Navbar/>
            <RoomProvider>
                <div className="flex bg-base-200">
                    <Channel />
                    <Chat />
                    <Users/>
                </div>
            </RoomProvider>
        </UserProvider>
    )
}

export default App
