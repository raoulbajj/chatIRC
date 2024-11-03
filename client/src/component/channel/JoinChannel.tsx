import { useContext } from 'react';
import { FaHashtag } from "react-icons/fa";
import { UserContext } from "../../context/UserContext";
import { RoomContext } from "../../context/RoomContext";
import { SubmitHandler, useForm } from "react-hook-form";
import { BsPlusCircle } from "react-icons/bs";

interface FormValues {
    room: string;
    roomId: number;
}

const JoinChannel = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>();
    const { socket } = useContext(UserContext);
    const { setJoined, room, setRoom } = useContext(RoomContext);

    const joinRoom: SubmitHandler<FormValues> = (data) => {
        if (socket) {

            if (room !== "" && room !== data.room) {
                leaveRoom();
            }
            else if (room === data.room) {
                leaveRoom();
            }

            setRoom(data.room)
            setJoined(true);
            socket.emit("join_room", data.room);
            reset();
        }
        else {
            console.log(errors)
        }
    }

    const leaveRoom = () => {
        if (socket) {
            socket.emit("leave_room", room);
            setJoined(false);
            setRoom("");
        }
    }

    return (
        <div className='transition-all duration-200'>
            <form onSubmit={handleSubmit(joinRoom)} className={"w-full flex items-center my-4 gap-2 transition-all duration-200"}>
                <input
                    className={`truncate input input-secondary w-full transition-all duration-200 ${errors.room && "input-error"}`}
                    type="text"
                    placeholder={"Channel Name..."}
                    {...register("room", { required: true, maxLength: 10, pattern: /^[a-zA-Z0-9]+$/ })}
                />
                <button type={"submit"} className={"btn bg-gradient-to-b from-secondary to-secondary-focus border-none text-secondary-content transition-all duration-200"}>
                    <BsPlusCircle className={"text-2xl transition-all duration-200"} />
                </button>
            </form>

            <div className={"py-3 rounded-xl flex w-full justify-between items-center"}>
                <div className={""}>Current Channel :</div>

                <div>
                    <button className={`btn btn-active btn-sm border-4 ${room !== "" ? "text-green-400 border-green-800 hover:text-green-300 hover:border-green-600" : ""}`}><FaHashtag />{room !== "" ? room : "N/A"}</button>
                </div>
            </div>
        </div>
    );
};

export default JoinChannel;