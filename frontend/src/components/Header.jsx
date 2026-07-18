import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import UserSettings from './UserSettings';
import {useSelector} from "react-redux";


function Header() {

    // TopMost Header Component with Admin User Image and Search Bar

    const [showOptions, setShowOptions] = useState(false);
    const [userProfilePicture, setUserProfilePicture] = useState("https://imgs.search.brave.com/aRcOscm4cEGOfi--Y2SZSNrAgt7ooJLnW5Moo-a0mOc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTg1/ODY2ODM0L3Bob3Rv/L21hbi1kcml2aW5n/LWNhci13aXRoLXBh/cGllci1tYWNoZS1z/aGFyay1vbi1yb29m/LmpwZz9zPTYxMng2/MTImdz0wJms9MjAm/Yz1QUE9xTzhXbC1i/VTlVSmk1RTk3cUYz/LTRtTE5VZjRfQ01X/MnRIT215bWV3PQ" );    
    const [searchForUser , setSearchForUser] = useState('');
    
    const admin = useSelector((state) => state.auth.userName);
    const adminFullName = useSelector((state) => state.auth.fullname);
    const adminPhoneNumber = useSelector((state) => state.auth.phonenumber);
    const adminDateOfBirth = useSelector((state) => state.auth.dateOfBirth);

        const toggleOptions = () => {
            setShowOptions(!showOptions);
        };

        const openUserSetting = () => {
            setShowOptions(!showOptions);
        };

        const searchUser = (e) => {
            e.preventDefault();
            console.log(searchForUser);
            setSearchForUser('');
        }

    
   
        return (
            <div
                id="Header"
                className="text-white  bg-black flex  md:flex-row items-center justify-between p-4 md:p-10"
           >
                {/* Admin User Image with Clickable Options */}
                <div className="flex justify-evenly md:flex-row items-center gap-4 w-full md:w-auto">
                    <img
                        className="h-16 w-16 rounded-full cursor-pointer object-cover border-4 border-white"
                        src= {userProfilePicture}
                        alt="Admin"
                        onClick={toggleOptions}
                    />

                    <div className="flex w-full max-w-md items-center border border-gray-300 rounded-full overflow-hidden">
                        <input
                            className="flex-grow p-2 pl-4 text-black focus:outline-none"
                            placeholder="Search Name"
                            type="text"
                            value={searchForUser}
                            onChange={(e)=> setSearchForUser(e.target.value)}
                        />
                        <button 
                        className="p-2 bg-white"
                        onClick={searchUser}
                        >
                            <i className="text-black fas fa-search"></i>
                        </button>
                    </div>

                    {showOptions && (
                    <div 
                    className='absolute left-10 top-40 w-2/3'
                    >
                        <UserSettings 
                            userProfilePicture={userProfilePicture}  
                            userName={admin}  
                            fullName={adminFullName}
                            phoneNumber={adminPhoneNumber}
                            dateOfBirth={adminDateOfBirth}
                            openUserSetting={openUserSetting}
                        />
                        </div>
                    )}
                </div>
            

                <span className="text-xl font-bold ml-5 md:mt-0">chat.IO</span>
            </div>
        );
}

export default Header;
