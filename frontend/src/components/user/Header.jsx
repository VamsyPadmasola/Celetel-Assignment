// import { useNavigate } from "react-router-dom";
import SearchBox from "../Interface/Search";


export default function Header() {
    return (
        <div className='flex-1 max-w-screen-xl flex items-center justify-between h-24'>
            <div className="w-[70%]">
                <SearchBox />
            </div>
            <div className="w-[30%] flex items-end justify-end space-x-8">
                <MdNotifications size={50} color={"#757575"} />
                <div className="bg-highlight text-center rounded-[50%] w-10 h-10 p-2 text-white font-bold">
                    A
                </div>
            </div>
        </div>
    )
}
