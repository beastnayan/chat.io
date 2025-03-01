import {body} from 'express-validator';


const registerUserValidator = () => {
    return [
        body('username').notEmpty().isLowercase().isLength({ min: 3 }).withMessage('Username is required'),
        body('fullname').notEmpty().withMessage('Fullname is required'),
        body('dob').notEmpty().withMessage('Date of birth is required'),
        body('phonenumber').notEmpty().withMessage('Phone number is required')
    ];
};

const loginUserValidator = () => {
    return [
        body("phonenumber")
        .notEmpty().withMessage("Phone number is required")
        .matches(/^\d{10}$/).withMessage("Phone number must be exactly 10 digits")
      
    ];

};

const otpValidator = () => { 
   
   return [
        body("otp").notEmpty().withMessage("OTP is required").isNumeric().withMessage("OTP must be a number")   

    ]
}

export { registerUserValidator, loginUserValidator, otpValidator };