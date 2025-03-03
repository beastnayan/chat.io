import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setOtp , clearOtp } from '../store/AuthSlice';
import { useDispatch,useSelector } from 'react-redux';

function OTPVerification() {
  // const [verificationCode, setVerificationCode] = useState('');
  const [inputCode, setInputCode] = useState('');
  const [timer, setTimer] = useState(60);
  const [isDisabled, setIsDisabled] = useState(false);

  const navigate = useNavigate(); 
  const otp = useSelector(state => state.auth.otp);
  const phonenumber = useSelector(state => state.auth.phonenumber);
  const userName = useSelector(state => state.auth.userName);
  const dispatch = useDispatch();


  useEffect(() => {
    if (timer === 0) {
      setIsDisabled(true);
      return;
    }

    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [timer]);

  const handleInputChange = (e) => {
    setInputCode(e.target.value);
   
  };

  // Handle the verification code submission
  const handleSubmit = () => {
    if (inputCode === otp.toString()) {
      alert('Verification successful!');
      console.log(userName,"User Name");
      
      
      navigate("/chatwindow")
    } else {
      alert('Invalid verification code.');
    }
  };

  // Resend OTP
  const resendOtp = async () => { 
 
      try {
      
        dispatch(clearOtp());

        let response = await axios.get("/api/v1/resend-otp", {
          params: { phonenumber: phonenumber?.trim() || "" }
        });

        console.log("New Otp : " , response.data.otp);
        
        
        dispatch(setOtp({ otp: response.data.otp }));
        setTimer(60);
        setIsDisabled(false);
       
  
      } catch (error) {
        
        console.log("failed to generate new otp")
      }

  }

  // Navigate back to the login page
  const handleBackToLogin = () => {
    navigate('/'); // Assuming your login page route is '/login'
  };

  return (
    <div
      className="flex flex-col bg-black-90 items-center h-screen pt-8 "
      style={{ backgroundColor: '#000' }}
    >
      <h2 className="text-4xl text-white font-semibold mt-44 mb-4">Enter 6-Digit Code</h2>
      <p className="text-xl text-white mb-4">Verification Code: {otp}</p>

      <input
        type="text"
        placeholder="Enter the 6-digit code"
        value={inputCode}
        onChange={handleInputChange}
        maxLength={6}
        className="border border-gray-300 rounded-md p-2 mb-4 w-64 text-center"
        disabled={isDisabled}
        style={{ backgroundColor: '#457b9d' }}
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        disabled={isDisabled}
      style={{backgroundColor : "#457b9d"}}

      >
        Verify
      </button>

      {/* Timer */}
      <div className="mt-4">
        <p className="text-lg text-white">Time Remaining: {timer}s</p>
      </div>

      {/* Resend OTP */}
      {timer === 0 && (
        <button
          onClick={resendOtp}
          className="mt-4 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
        >
          Resend OTP
        </button>
      )}

      {/* Back to Login */}
      <button
        onClick={handleBackToLogin}
        className="mt-4 bg-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-400"
      >
        Back to Login
      </button>
      <p className="text-white mt-2 text-sm">Go back if you want to change your mobile number.</p>
    </div>
  );
}

export default OTPVerification;
