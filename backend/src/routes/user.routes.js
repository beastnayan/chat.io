import express from "express";
import { sendOtpToUser , resendOtp} from "../controllers/otp.controllers.js";
import { registerUser } from "../controllers/auth.controllers.js";
import {upload} from "../middlewares/uploads.middlewares.js";
// import { otpValidator } from "../validators/auth.validators.js";

const router =express.Router();

// router.post("/api/v1/otp", (req, res) => {
//     console.log("Send OTP route hit");
    
//     // Call the function to send OTP
//     sendOtpToUser(req, res);
//   });

router.route("/otp").get(sendOtpToUser);
router.route("/resend-otp").get(resendOtp);
router.route("/register").post(upload.single("profilePic"),registerUser);

export default router;
