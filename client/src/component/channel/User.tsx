import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { useForm, SubmitHandler } from "react-hook-form";
import { FiSettings } from "react-icons/fi";
import { FaSave } from "react-icons/fa";

interface FormData {
    username: string;
}

const User = () => {
    const { username, changeUsername } = useContext(UserContext);
    const [change, setChange] = useState<boolean>(false);
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const handleChangeUsername = () => {
        setChange(true);
    };

    const onSubmit: SubmitHandler<FormData> = (data) => {
        changeUsername(data.username);
        setChange(false);
    };

    return (
        <div className="h-[14vh] bg-base-200 break-words flex items-center justify-center w-full">
            {change ? (
                <div>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-5">
                        <input
                            className={`text-2xl py-2 px-5 rounded-xl bg-base-300 ${errors.username && "input-error"}`}
                            type="text"
                            placeholder="username"
                            {...register("username", {
                                required: {
                                    value: true,
                                    message: "Username is required",
                                },
                                maxLength: {
                                    value: 16,
                                    message: "Username must be less than 16 characters",
                                },
                                pattern: {
                                    value: /^[a-zA-Z0-9]+$/,
                                    message: "Username must be alphanumeric",
                                },
                            })}
                        />
                        <button type="submit" className="text-2xl text-secondary hover:stroke-2 hover:text-green-300 transition-colors duration-200">
                            <FaSave />
                        </button>
                    </form>

                    {errors.username && <p className="text-error text-sm mt-2">{errors.username.message}</p>}
                </div>
            ) : (
                <div className="flex gap-5 py-5 px-5 items-center text-2xl rounded-xl bg-base-200 hover:bg-base-300  border-2 border-transparent hover:border-green-400 w-full justify-around whitespace-nowrap transition-all duration-200">
                    <p className="w-[200px] transition-colors duration-200 truncate text-green-400" onClick={handleChangeUsername}>{username}</p>
                    <button>
                        <FiSettings className="text-2xl text-secondary hover:text-green-300 transition-all duration-200" value="Change Username" onClick={handleChangeUsername} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default User;