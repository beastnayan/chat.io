
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setActiveUser, setOtp } from "../store/AuthSlice";
import { Phone } from 'lucide-react';
import LoginSkeleton from "../loadingSkeleton/LoginSkeleton";




function LoginPage() {

  const [isLoading, setIsLoading] = useState(false);
  const [phonenumber, setPhoneNumber] = useState('')
  const [phoneNumberError, setPhoneNumberError] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handelInputChange(e) {
    setPhoneNumber(e.target.value)
  }

  async function handelSendOTP() {

    const phonePattern = /^\d{10}$/;
    
    if (phonePattern.test(phonenumber)) {
      try {
        let response = await axios.post("/api/v1/",
          { phonenumber: phonenumber.trim() || "" }
        );
        console.log("Response from server:", response);
        dispatch(setActiveUser({
          phonenumber: response.data.user.phonenumber
          , userName: response.data.user.username, fullname: response.data.user.fullname, otp: response.data.otp
        }));
        dispatch(setOtp({ otp: response.data.otp }));
        console.log("Phone number sent: ", phonenumber);
        navigate("/otp");
        setPhoneNumber(``);
      } catch (error) {
        console.log("Error details: ", error);
        setPhoneNumber(``);
      }
    } else {
      setPhoneNumberError("Please enter a valid 10-digit mobile number");
      setPhoneNumber(``);
    }
  }
  return (
    <>
      {isLoading ? <LoginSkeleton /> : (
        <div className="bg-black min-h-screen text-white flex flex-col justify-center items-center">
          <div className="mt-6  flex justify-center items-center px-4">
            <div className="flex flex-col items-center justify-center gap-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl shadow-blue-500/10 w-full max-w-md mx-auto px-6 sm:px-8 md:px-12 py-8">

              <img
                src="/CHAT.IO LOGO.png"
                alt="App Logo"
                className="h-16 w-16 sm:h-20 sm:w-20 rounded-full"
              />

              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-center">
                Welcome Back
              </h2>

              <span className="text-gray-300 text-xs sm:text-sm text-center">
                Don't have an account?
                <a
                  href="/registerationPage"
                  className="hover:text-blue-300 text-base sm:text-lg ml-2 text-white underline transition-colors duration-300"
                >
                  Sign up
                </a>
              </span>

              {/* Phone Input */}
              <div className="flex items-center gap-3 w-full rounded-xl px-4 py-3 border border-gray-700 bg-white/5 backdrop-blur-md shadow-lg shadow-blue-500/10 hover:border-blue-500 focus-within:border-blue-500 focus-within:shadow-blue-500/20 transition-all duration-300">

                <Phone
                  className="text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]"
                  size={20}
                />

                <input
                  className="bg-transparent text-white w-full outline-none placeholder:text-gray-400 text-sm sm:text-base"
                  type="text"
                  placeholder="Enter your mobile number"
                  value={phonenumber}
                  onChange={handelInputChange}
                />
              </div>
                <span className="text-red-500 text-xs sm:text-sm">{phoneNumberError}</span>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center w-full">

                <button
                  onClick={handelSendOTP}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-sm text-white py-2.5 px-6 rounded-xl hover:scale-105 transition-all duration-300 w-full sm:w-auto shadow-lg shadow-blue-500/30"
                >
                  Send OTP
                </button>

                <button
                  // onClick={}
                  className="bg-white/10 backdrop-blur-md border border-white/10 text-sm text-white py-2.5 px-6 rounded-xl hover:bg-white/20 transition-all duration-300 w-full sm:w-auto"
                >
                  Cancel
                </button>

              </div>

            </div>
          </div>
        </div>
      )}
    </>

  );
}


export default LoginPage;
