import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaCamera } from "react-icons/fa";
import { useDispatch } from 'react-redux'
import { setActiveUser, clearActiveUser } from "../store/AuthSlice";
import RegisterSkeleton from "../loadingSkeleton/RegisterSkeleton";
import { checkPhoneNumber , checkUserName} from "../UtilityFunction/ValidationService";
import Debounce from "../UtilityFunction/Debounce"


function RegistrationPage() {

  const [storeFormData, setFormData] = useState({
    fullname: "",
    dob: "",
    username: "",
    phonenumber: "",

  });
  const [selectedImage, setSelectedImage] = useState(null)
  const [previewImage, setPreviewImage] = useState("");
  const [storeImageFromInput, setStoreImageFromInput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [phoneError ,setPhoneError] = useState('')
  const [userNameError , setUserNameError] = useState('')
  const dispatch = useDispatch();

  
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value || "",

    }));

    if(name === "phonenumber") {
      debouncedCheckPhoneNumber(value)
    }
    if(name === 'username'){
      console.log("username changed: ", value);

      debouncedCheckUserName(value)
    }
  };

  const handleImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file && e.target.files !== 0) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(file);
      setPreviewImage(imageUrl);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!storeFormData.fullname || !storeFormData.dob || !storeFormData.username || !storeFormData.phonenumber) {
      console.error("Some fields are empty");
      return;
    }
    sendformData(storeFormData)

    setFormData({
      fullname: "",
      dob: "",
      username: "",
      phonenumber: "",
    });

  };

  console.log("storeFormData: ", storeFormData);

  // useEffect(() => {

  //   console.log("Updated selectedImage us:", selectedImage);

  // }, [selectedImage]);

  const sendformData = async (data) => {
     console.log("Entered HandelSubmit -5")
    try {
      const formDataToSend = new FormData();

      Object.keys(data).forEach((key) => {
        if (data[key] !== undefined && data[key] !== null) {
          formDataToSend.append(key, data[key]);
        }
      });

      for (let pair of formDataToSend.entries()) {
        console.log("pairrr :", pair[0], pair[1]);
      }

      if (selectedImage) {
        formDataToSend.append("profilePic", selectedImage);
      }

      const sendData = await axios({
        method: "Post",
        url: "/api/v1/register",
        data: formDataToSend,

      })

      dispatch(setActiveUser({ username: data.username, phonenumber: data.phonenumber, fullname: data.fullname, dob: data.dob }));

    }
    catch (error) {
      console.log("error message", error);
    }

  }

  //  ---------------------------------------------------------------
  //  debounce  to check phonenumber and username is occupied or not
  // -----------------------------------------------------------------

     let debouncedCheckPhoneNumber = Debounce(async (phonenumber) => {
        try{
          const response = await checkPhoneNumber(phonenumber)

          if(response.data.exists){
            setPhoneError("phonenumber is already Registered")
          }else{
            setPhoneError("")
          }
        }
        catch(error){
          console.log("Error in Phone Number check: " , error )
        }
     },1000)

      let debouncedCheckUserName = Debounce(async (userName) => {
        try{
          const response = await checkUserName(userName)

          if(response.data.exists){
            setUserNameError("user name is already taken")
          }else{
            setUserNameError("")
          }
        }
        catch(error){
          console.log("Error in user name check: " , error )
        }
     },1000)



  return (
    isLoading ? (
      <RegisterSkeleton />
    ) : (
      <div
        className="flex flex-col bg-black items-center min-h-screen justify-center px-4 py-8 overflow-y-hidden hide-scrollbar "
      >
        {/* Image Upload Section */}
        <div className="relative mb-8">
          <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden bg-[#1f1f1f] border border-white/10 shadow-xl shadow-blue-500/20 flex items-center justify-center">
            {selectedImage ? (
              <img
                src={previewImage}
                alt="Uploaded"
                className="w-full h-full object-cover"
              />
            ) : (
              <p className="text-gray-500 text-sm ">No Image</p>
            )}
          </div>

          {/* Camera Icon */}
          <label
            htmlFor="imageInput"
            className="absolute bottom-1 right-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full p-3 cursor-pointer shadow-lg shadow-blue-500/40 hover:scale-110 transition-all duration-300"
          >
            <FaCamera size={18} />
          </label>

          <input
            id="imageInput"
            type="file"
            accept="image/*"
            capture="user"
            className="hidden"
            name="profilePic"
            onChange={handleImageChange}
          />
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl shadow-blue-500/10 rounded-3xl px-6 py-8 sm:px-8 w-full max-w-md"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-white mb-6">
            Register
          </h2>

          {/* Full Name */}
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="fullname"
              maxLength={30}
              minLength={3}
              required
              value={storeFormData.fullname}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full rounded-xl px-4 py-3 border border-gray-700 bg-[#1f1f1f] text-white placeholder:text-gray-400 focus:border-blue-500 focus:outline-none transition-all duration-300"
            />
          </div>

          {/* Date of Birth */}
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              required
              value={storeFormData.dob}
              onChange={handleChange}
              className="w-full rounded-xl px-4 py-3 border border-gray-700 bg-[#1f1f1f] text-gray-300  focus:border-blue-500 focus:outline-none transition-all duration-300"
            />
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Phone No.
            </label>
            <input
              type="text"
              name="phonenumber"
              maxLength={10}
              // minLength={10}
              required
              value={storeFormData.phonenumber}
              onChange={handleChange}
              onBlur={checkPhoneNumber}
              placeholder="Enter your phone number"
              className="w-full rounded-xl px-4 py-3 border border-gray-700 bg-[#1f1f1f] text-white placeholder:text-gray-400 focus:border-blue-500 focus:outline-none transition-all duration-300"
            />
            <span className="text-red-500 text-sm ">{phoneError}</span>
          </div>

          {/* Username */}
          <div className="mb-6">
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              name="username"
              maxLength={30}
              minLength={3}
              required
              value={storeFormData.username}
              onChange={handleChange}
              placeholder="Create a username"
              className="w-full rounded-xl px-4 py-3 border border-gray-700 bg-[#1f1f1f] text-white placeholder:text-gray-400 focus:border-blue-500 focus:outline-none transition-all duration-300"
            />
            <span className="text-red-500 text-sm ">{userNameError}</span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 rounded-xl shadow-lg shadow-blue-500/30 hover:scale-105 transition-all duration-300"
          >
            Register
          </button>
        </form>
      </div>
    )

  );
}

export default RegistrationPage;
