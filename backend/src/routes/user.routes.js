import express from "express";
import { sendOtpToUser , resendOtp} from "../controllers/otp.controllers.js";
import { registerUser , loginUser} from "../controllers/auth.controllers.js";
import {upload} from "../middlewares/uploads.middlewares.js";
// import { otpValidator } from "../validators/auth.validators.js";
import { getLoggedInUser } from "../controllers/auth.controllers.js";

const router = express.Router();

// router.post("/api/v1/otp", (req, res) => {
//     console.log("Send OTP route hit");
    
//     // Call the function to send OTP
//     sendOtpToUser(req, res);
//   });

router.route("/").post(loginUser);
router.route("/otp").get(sendOtpToUser);
router.route("/resend-otp").get(resendOtp);
router.route("/register").post(upload.single("profilePic"),registerUser);
router.route("/getLoggedInUser").post(getLoggedInUser);

export default router;
