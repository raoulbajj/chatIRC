import { RoomContext } from "../../context/RoomContext";
import { UserContext } from "../../context/UserContext";
import { useContext, useEffect, useState } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { IoExit } from "react-icons/io5";
import { RiDeleteBin2Line } from "react-icons/ri";
import { AiOutlineEnter } from "react-icons/ai";
import { BiPencil } from "react-icons/bi";
import { FaSave } from "react-icons/fa";

type MyFormValues = FieldValues & {
    newRoomName: string;
};

const MyChannels = () => {
    const { socket } = useContext(UserContext);
    const { room, setRoom, joined, setJoined } = useContext(RoomContext);

    const [editingRoom, setEditingRoom] = useState<string | null>(null);
    const [oldRoomName, setOldRoomName] = useState<string>("");
    const { register, handleSubmit, reset, formState: { errors } } = useForm<MyFormValues>();
    const [roomsArray, setRoomsArray] = useState({
        currentRoom: "",
        joinedRooms: [] as string[]
    });

    const addRoomToRoomsArray = (room: string) => {
        if (!roomsArray.joinedRooms.includes(room)) {
            setRoomsArray({ ...roomsArray, joinedRooms: [...roomsArray.joinedRooms, room] });
        }
    };

    const switchRoom = (room: string) => {
        leaveRoom();

        setRoomsArray({ ...roomsArray, currentRoom: room });
        setRoom(room);

        if (socket) {
            socket.emit("join_room", room);
            setJoined(true);
            return;
        }

        setJoined(true);
    };

    const removeRoomFromRoomsArray = (room: string) => {
        setRoomsArray({ ...roomsArray, joinedRooms: roomsArray.joinedRooms.filter((joinedRoom) => joinedRoom !== room) });

        if (socket) {
            socket.emit("leave_room", room);
        }

        if (room === roomsArray.currentRoom) {
            setJoined(false);
            setRoom("");
        }
    };

    const leaveRoom = () => {
        if (socket) {
            socket.emit("leave_room", room);
        }

        setJoined(false);
        setRoom("");
    };

    const handleChangeRoomName = (roomName: string) => {
        setEditingRoom(roomName);
        reset();
    };

    const onSubmit: SubmitHandler<MyFormValues> = (data) => {
        const { newRoomName } = data;
        const roomIndex = roomsArray.joinedRooms.findIndex((joinedRoom) => joinedRoom === oldRoomName);

        if (roomsArray.joinedRooms.includes(newRoomName)) {
            alert("A channel with this name already exists. Please choose another name.");
            return;
        }

        if (roomIndex === -1) {
            alert("The room you are trying to rename doesn't exist.");
            return;
        }

        if (socket) {
            socket.emit("change_room_name", { oldRoomName, newRoomName });
        }

        setEditingRoom(null);
        setOldRoomName("");

        const newJoinedRooms = [...roomsArray.joinedRooms];
        newJoinedRooms[roomIndex] = newRoomName;

        if (roomsArray.currentRoom === oldRoomName) {
            setRoomsArray({ ...roomsArray, currentRoom: newRoomName, joinedRooms: newJoinedRooms });
            setRoom(newRoomName);
        }
        else {
            setRoomsArray({ ...roomsArray, joinedRooms: newJoinedRooms });
        }
    };

    useEffect(() => {
        if (joined && room !== "") {
            if (!roomsArray.joinedRooms.includes(room)) {
                addRoomToRoomsArray(room);
                leaveRoom();
            }
        }

        if (joined && room !== "") {
            if (!roomsArray.joinedRooms.includes(room)) {
                addRoomToRoomsArray(room);
                leaveRoom();
            }
        }
    }, [joined, room]);

    useEffect(() => {
    }, [roomsArray.currentRoom]);

    // console.log(roomsArray);

    return (
        <div className="h-full flex gap-5 items-start px-5 overflow-y-auto overflow-x-hidden justify-center min-w-full transition-all duration-200">
            <div className="flex gap-5 flex-col-reverse transition-all duration-200">
                {roomsArray.joinedRooms.map((joinedRoom) => (
                    <div className="w-full transition-all duration-200 flex gap-5 px-5 py-5 bg-base-300 hover:shadow-sm hover:shadow-green-500 hover:bg-base-200 rounded-full justify-around items-center border-4 border-base-300 hover:border-green-400" key={joinedRoom}>
                        {editingRoom === joinedRoom ? (
                            <form onSubmit={handleSubmit(onSubmit)} className="flex gap-5 transition-all duration-200 just">
                                <input
                                    {...register("newRoomName",
                                        {
                                            required: {
                                                value: true,
                                                message: "New name is required",
                                            },
                                            maxLength:
                                            {
                                                value: 10,
                                                message: "Channel must be maximum 10"
                                            },
                                            pattern: {
                                                value: /^[a-zA-Z0-9]+$/,
                                                message: "Username must be alphanumeric",
                                            },
                                        })}
                                    placeholder="New name..."
                                    className={`max-w-[150px] min-w-[150px] text-sm py-2 px-5 rounded-xl bg-base-300 transition-all duration-200 ${errors.newRoomName && "input-error"}`}
                                />
                                <button aria-label="SAVE" type="submit" className="text-xl text-secondary hover:stroke-2 hover:text-green-300 transition-all duration-200">
                                    <FaSave />
                                </button>
                            </form>
                        ) : (
                            <>
                                <div aria-label="EDIT" className="text-2xl hover:text-secondary transition-all duration-200" onClick={() => { setOldRoomName(joinedRoom); handleChangeRoomName(joinedRoom); }}>
                                    <BiPencil />
                                </div>
                                <p className="w-full text-green-400 transition-all duration-200">{joinedRoom}</p>
                                {(joinedRoom === roomsArray.currentRoom && joined) ? (
                                    <div className="text-2xl hover:text-secondary transition-all duration-200" onClick={() => leaveRoom()}>
                                        <IoExit />
                                    </div>
                                ) : (
                                    <div className="text-2xl hover:text-secondary transition-all duration-200" onClick={() => { switchRoom(joinedRoom); }}>
                                        <AiOutlineEnter />
                                    </div>
                                )}

                                <div className="text-2xl hover:text-secondary transition-all duration-200" onClick={() => { removeRoomFromRoomsArray(joinedRoom); }}>
                                    <RiDeleteBin2Line />
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div >
    )
};

export default MyChannels