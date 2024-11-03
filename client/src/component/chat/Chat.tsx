import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { FaSmileBeam } from "react-icons/fa";
import { BiSolidSend } from "react-icons/bi";
import TextareaAutosize from 'react-textarea-autosize';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RoomContext } from "../../context/RoomContext";

interface Message {
    room: string;
    content: string;
    username: string | null;
    userID: string | null;
}
interface FormValues {
    message: string;
}

const Chat = () => {

    // Context
    const { username, userID, socket } = useContext(UserContext);
    const { room, joined } = useContext(RoomContext);

    // State
    const [messages, setMessages] = useState<Message[]>([]);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    // Form
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>();

    const sendMessage: SubmitHandler<FormValues> = (data) => {
        if (data.message && joined && socket) {
            const messageObject: Message = {
                room: room,
                content: data.message,
                username: username,
                userID: userID
            };
            socket.emit("send_message", messageObject);
            setMessages((oldMsg) => [...oldMsg, messageObject]);
            reset();
        }
        else {
            console.log(errors)
        }
    }

    useEffect(() => {
        if (socket) {
            socket.on("join_room", () => {
                setMessages([]); // Resets the state of messages when a new room is joined
            });
            socket.on("receive_message", (messageObject: Message) => {
                if (messageObject.room === room) {
                    setMessages((oldMsg) => [...oldMsg, messageObject]);
                }
            });
            socket.on("previous_messages", (previousMessages: Message[]) => {
                setMessages(previousMessages);
            });
            return () => {
                socket.off("join_room");
                socket.off("receive_message");
                socket.off("previous_messages");
            };
        }
    }, [socket, room]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSubmit(sendMessage)();
            console.log("message sent");
        }
    };

    console.log(messages);

    return joined ? (
        <div className="w-full flex flex-col justify-between bg-base-200">

            <div className="p-5 h-full">
                <div className={"h-full overflow-y-auto rounded-xl bg-base-300"}>
                    <div className={"h-[70vh] w-full p-5"}>
                        {joined && messages.map((messageObject, index) => (
                            <div key={index} className={`chat ${messageObject.userID === userID ? 'chat-end mb-5' : 'chat-start'}`}>
                                <div className="chat-header pb-1">
                                    {messageObject.username}
                                </div>
                                <div className={`break-words chat-bubble ${messageObject.userID === userID ? 'chat-bubble-primary' : ''}`}>
                                    {messageObject.content}
                                </div>
                                <div ref={messagesEndRef}></div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit(sendMessage)}>
                <div className="flex items-end p-4 rounded-xl bg-base-200">
                    <button type={"button"} className={`btn btn-square btn-active ${!joined ? 'pointer-events-none opacity-50' : ''}`}>
                        <FaSmileBeam className={`text-2xl ${!joined ? 'opacity-20 text-base-content' : 'text-white'}`} />
                    </button>
                    <TextareaAutosize
                        minRows={1}
                        maxRows={10}
                        className={`resize-none textarea w-full mx-4 ${errors.message ? 'textarea-error' : ''} ${joined ? 'textarea-secondary' : 'opacity-50 pointer-events-none'}`}
                        placeholder="Your message..."
                        onKeyDown={handleKeyDown}
                        {...register("message", { required: true, maxLength: 2000 })}
                    />
                    <button type={"submit"} className={`btn btn-square btn-active ${!joined || errors.message ? 'pointer-events-none opacity-50' : 'btn-secondary'}`}>
                        <BiSolidSend className={`text-2xl ${!joined || errors.message ? 'opacity-20 text-base-content' : 'text-white'}`} />
                    </button>
                </div>
            </form>

        </div>
    ) : (
        <div className="w-full flex-col justify-between bg-base-200">
        <div className={"m-10 h-[75vh] overflow-y-auto rounded-xl bg-base-300 justify-center items-center gap-3 flex text-3xl text-green-300 transition-all duration-500"}>
            <p>Join a room to start chatting !</p>
            <FaSmileBeam className={`text-5xl opacity-20 text-base-content`} />
        </div>
    </div>

    );

};

export default Chat;