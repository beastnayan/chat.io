import {User} from '../models/user.models.js';
import generateOTP from '../utils/generateOtp.js';
import { OTPModel } from '../models/otp.models.js';  


async function generateAcessTokenAndRefreshToken(userid)  {

    try {
        const user = await User.findById(userid);
        console.log(user);

        const acessToken = user.generateAcessTokens()
        const refreshToken = user.generateRefershTokens()

        user.refreshtoken = refreshToken;

        return {acessToken,refreshToken}    
 
    } catch (error) {
        console.log("error : 500", error)
        
    }
}

// const registerUser = async (req , res) => {
   
        
//         // check spelling
//         try {
//             const {username , fullname , dob , phonenumber  } = req.body;
//             const profilePic = req.file?.path;
//             // const userExists = await User.findOne({phonenumber,username});

//             console.log(username , fullname , dob , phonenumber  , "Registeration page");
//             console.log(profilePic , "Profile Pic");
            
            




//             const userExist = await User.findOne({phonenumber });
//             if(userExist){  
//                 return res.status(400).json({message : "User already exists"})  
//             }
            
//             const user = await  User.create({
//                 username,
//                 fullname,
//                 dob,
//                 phonenumber,
//                 profilePic
//             });
//             console.log(user);
            
//             return res.status(201).json({message : "User created successfully", user})

//         } catch (error) {
//             res.status(500).json({message:"server error"})
            
//         }
        
   
// }

const registerUser = async (req, res) => {
    try {
        const { username, fullname, dob, phonenumber } = req.body;
        console.log("request Body " , req.body)
        const profilePic = req.file ? req.file.path : null; // Ensure profilePic is properly assigned

        console.log("Received data:", username, fullname, dob, phonenumber);
        console.log("Profile Pic Path:", profilePic);

        // Check if user already exists
        const userExist = await User.findOne({ phonenumber });  
        if (userExist) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Create new user
        const user = await User.create({
            username,
            fullname,
            dob,
            phonenumber,
            profilePic
        });

        console.log("User Created:", user);

        return res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
        console.error("Error registering user:", error); // Log full error
        res.status(500).json({ message: "Server error" });
    }
};

const loginUser = async (req , res) => {

   try {
    const {phonenumber} = req.body;
    const userExists = await User.findOne({phonenumber: phonenumber.trim()});  
    console.log(phonenumber, "Phone number received in loginUser"); 
    if(!userExists){
        return res.status(400).json({message : "User does not exist. Register Yourself"})
    }
    const generateOtp = generateOTP();
    console.log(generateOtp , "Generate OTP");
    let createModel = await OTPModel.create({ phonenumber, OTP: generateOtp });
    console.log(createModel , "OTP Model Created");
    const {acessToken,refreshToken} = await generateAcessTokenAndRefreshToken(userExists._id);
    console.log(acessToken, refreshToken, "Tokens generated");
    return res.status(200).json(
        {
         acessToken,
         refreshToken,
         otp : generateOtp,
         redirect : "/otp",
         message: "User logged in successfully",
         user: userExists, // Corrected this variable
        }
    );

   } catch (error) {
    res.status(401).json({message : "Invalid Credentials"})
   }
    
}


export {registerUser,loginUser}