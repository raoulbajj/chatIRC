import User from "./User.tsx";
import JoinChannel from "./JoinChannel";
import MyChannels from "./MyChannels.tsx";

const Channel = () => {
    return (
        <div className="flex flex-col w-[600px] h-[90vh] bg-base-200 justify-between px-5 py-5 shadow-lg transition-all duration-200">
            <JoinChannel />
            <div className='divider transition-all duration-200'></div>
            <MyChannels />
            <div className="divider transition-all duration-200"></div>
            <User />
        </div>
    );
};

export default Channel;