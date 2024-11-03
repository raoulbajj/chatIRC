import DarkMode from "../utils/DarkMode";
import myLogo from "../../assets/my-irc-100.png";

const Navbar = () => {
    return (
        <div className="bg-base-200 h-[10vh] flex">
            <div className="mx-8 flex w-full justify-between items-center">
                <div className={"flex items-center pointer-events-none"}>
                    <img className={"w-[100px]"} src={myLogo} alt="logo"/>
                    <p className="flex items-center justify-center font-bold bg-gradient-to-l from-secondary to-secondary-focus bg-clip-text text-transparent text-4xl">SPARKS</p>
                </div>

                <div>
                    <DarkMode />
                </div>
            </div>

        </div>
    );
};

export default Navbar;