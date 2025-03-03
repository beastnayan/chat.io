
import React, { useState , useEffect }  from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setActiveUser, setOtp  } from "../store/AuthSlice";


function LoginPage() {

const [ phonenumber , setPhoneNumber] = useState('')

const navigate = useNavigate();
const dispatch = useDispatch();


function handelInputChange(e){
   
  setPhoneNumber(e.target.value)
}



async function handelSendOTP() {
    const phonePattern = /^\d{10}$/;
  
    if (phonePattern.test(phonenumber)) {
      console.log("Entered in if condition");
      console.log("Phone number:", phonenumber); // Log the phone number
  
      try {
        console.log("Sending request to:", `phonenumber=${phonenumber}`);
  
        let response = await axios.post("/api/v1/", 
          { phonenumber: phonenumber.trim() || "" }
        );

       
  
        console.log("Response from axios: ", response.data); 
       
  
        dispatch(setActiveUser({ phonenumber: response.data.user.phonenumber
          , userName : response.data.user.username , fullname :   response.data.user.fullname , otp: response.data.otp }));
        dispatch(setOtp({ otp: response.data.otp }));
        console.log("Phone number sent: ", phonenumber);
        navigate("/otp");
      } catch (error) {
        console.log("Error from axios: ", error.response ? error.response.data : error.message);
        console.log("Error status: ", error.response ? error.response.status : "No status");
        console.log("Error details: ", error);
      }
    } else {
    //   setError('Please enter a valid 10-digit mobile number');
    console.log("Please enter a valid 10-digit mobile number");
    
    }
  }


    return (
        <>
        <div  className="flex flex-col items-center bg-black h-screen pt-8">
            <img 
                src="/CHAT.IO LOGO.png" 
                alt="App Logo" 
                className="h-44 w-44 mt-10 mb-20 rounded-full"
            />
            <h2 className="text-4xl text-white   font-semibold mb-4">Phone Verification....</h2>
            <input 
                type="text"
                placeholder="Enter your mobile number"
                className="border border-gray-300 rounded-md p-2 mb-4 w-64 text-center"
                value={phonenumber}
                onChange={handelInputChange}
                style={{backgroundColor : "#457b9d"}}

            />

            {/* <span className="mt-4 mb-4 text-red-400">{error}</span> */}


            <button
                onClick={handelSendOTP}
                style={{backgroundColor : "#457b9d"}}
                className="bg-blue-500   text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
                Send OTP
            </button>
        </div>
    </>
    
    );
}

 
export default LoginPage ;
