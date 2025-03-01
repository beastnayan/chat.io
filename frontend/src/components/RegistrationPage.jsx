import React, { useState , useEffect } from "react";
import { FaCamera } from "react-icons/fa";
import { useDispatch } from 'react-redux'
import { setActiveUser , clearActiveUser } from "../store/AuthSlice";
import axios from "axios";  

function RegistrationPage() {

  const [storeFormData, setStoreFormData] = useState({
    fullname: "",
    dob: "",
    username: "",
    phonenumber: "",

  });

  const [selectedImage, setSelectedImage] = useState(null)
  const [previewImage , setPreviewImage] = useState(""); 
  const [storeImageFromInput, setStoreImageFromInput] = useState(null); 
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setStoreFormData((prevData) => ({
      ...prevData,
      [name]: value || "",
      
    }));
  };

  const handleImageChange =  (e) => {
    const file = e.target.files[0];
    console.log("Check ", "file", file);
    if (file && e.target.files !== 0) {
      const imageUrl =  URL.createObjectURL(file);
      setSelectedImage(file);
      setPreviewImage(imageUrl);
      console.log("Check 2.1", "selectedImage 1", selectedImage ,  "previewIamge 1", previewImage);
      console.log("Check 2", "file", file, "imageUrl", imageUrl);
     
      
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!storeFormData.fullname || !storeFormData.dob || !storeFormData.username || !storeFormData.phonenumber) {
      console.error("Some fields are empty");
      return;
    }
    sendformData(storeFormData)

    setStoreFormData({
      fullname: "",
      dob: "",
      username: "",
      phonenumber: "",
    });
    
  };


  useEffect(() => {
    console.log("Updated selectedImage us:", selectedImage);
    
  }, [selectedImage]);

  
  const sendformData = async (data) =>{
    try {

      console.log("ender in send data block ");
      
      const formDataToSend = new FormData();

      Object.keys(data).forEach((key) => {
        if (data[key] !== undefined && data[key] !== null) { 
          formDataToSend.append(key, data[key]);
        }
      });


      for (let pair of formDataToSend.entries()) {
        console.log("pairrr :",pair[0], pair[1]); 
    }


      if(selectedImage){  
        formDataToSend.append("profilePic", selectedImage);
        
      }

        
        
      const sendData = await axios({
        method:"Post",
        url:"/api/v1/register",
        data: formDataToSend , 
       
      })

      dispatch(setActiveUser({username: data.username , phonenumber: data.phonenumber, fullname: data.fullname, dob: data.dob}));

      console.log("sendData", sendData.data);  
    } 
    catch (error)
      {
       console.log("error message", error);  
      }

  } 



  return (
    <div
      className="flex flex-col bg-black border-white items-center min-h-screen justify-center px-4"
    >
      {/* Image Upload Section */}
      <div className="relative mb-8">
        <div className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
          {selectedImage ? (
            <img
              src={previewImage}
              alt="Uploaded"
              className="w-full h-full object-cover"
            />
          ) : (
            <p className="text-gray-500 text-sm md:text-base">No Image</p>
          )}
        </div>

        {/* Camera Icon */}
        <label
          htmlFor="imageInput"
          className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 cursor-pointer"
        >
          <FaCamera size={18} />
        </label>
        <input
          id="imageInput"
          type="file"
          accept="image/*"
          capture="user" // Enables camera for mobile
          className="hidden"
          name="profilePic"
          onChange={handleImageChange}
        />
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-black border-white border-2 shadow-md rounded px-6 py-6 sm:px-8 sm:py-8 w-full max-w-sm sm:max-w-md"
      >
        <h2 className="text-xl sm:text-2xl font-bold text-center text-blue-600 mb-4">
          Register
        </h2>

        {/* Name Input */}
        <div className="mb-4">
          <label className="block text-white text-sm sm:text-base font-bold mb-2">
            Full Name
          </label>
          <input
            type="text"
            name="fullname"
            required={true}
            value={storeFormData.fullname}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="shadow appearance-none border bg-black rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Date of Birth Input */}
        <div className="mb-4">
          <label className="block text-white text-sm sm:text-base font-bold mb-2">
            Date of Birth
          </label>
          <input
            type="date"
            name="dob"
            required={true}
            value={storeFormData.dob}
            onChange={handleChange}
            className="shadow appearance-none border bg-black rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"

          />
        </div>


        // Enetr mobile No
        <div className="mb-4">
          <label className="block text-white text-sm sm:text-base font-bold mb-2">
            Phone No.
          </label>
          <input
            type="text"
            name="phonenumber"
            required={true}
            value={storeFormData.phonenumber}
            onChange={handleChange}
            placeholder="Enter your phone number"
            className="shadow appearance-none border bg-black rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Username Input */}
        <div className="mb-4">
          <label className="block text-white text-sm sm:text-base font-bold mb-2">
            Username
          </label>
          <input
            type="text"
            name="username"
            required={true}
            value={storeFormData.username}
            onChange={handleChange}
            placeholder="Create a username"
            className="shadow appearance-none border bg-black rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"

          />
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            
            className="bg-blue-500 hover:bg-gray-300 text-black bg-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegistrationPage;
