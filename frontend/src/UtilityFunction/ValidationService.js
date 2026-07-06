import axios from "axios";

export const  checkPhoneNumber = async (phonenumber) => {

    if(!phonenumber) return
     try {
      const response = await axios.get(
        `/api/v1/check-phone/${phonenumber}`
      );

     return response
    } catch (error) {
       console.log( error)
    }
  };

  export const  checkUserName = async (userName) => {

    if(!userName) return
    
     try {
      const response = await axios.get(
        `/api/v1/check-username/${userName}`
      );

     return response
    } catch (error) {
       console.log( error)
    }
  };



  