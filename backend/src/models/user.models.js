import mongoose , { Schema } from 'mongoose';
import jwt from 'jsonwebtoken';


const UserSchema = new Schema(
    {
        userImage: {
           type: String,
        },

        username:{
            type: String,
            required:true,
            unique:true,
            trim:true,
            lowercase:true,
        },

        fullname:{
            type :String,
            required:true,
            trim:true,
        },

        dob:{
            type: Date,
            required:true,
        },  

        phonenumber:{
            type: String,
            required:true,
            trim:true,
            unique:true,

        },

        refreshtoken:{
            type: String,
            default: null ,
            trim:true,
        },

        
    },


   {timestamps:true}

);

UserSchema.methods.generateAcessTokens = function() {
   return jwt.sign(
    {
        _id: this._id,
        username: this.username,
        fullname: this.fullname,
        dob: this.dob,
        phonenumber: this.phonenumber
    },
    process.env.ACESS_TOKEN_SECRET,

    {
       expiresIn: process.env.ACESS_TOKEN_SECRET_EXPIRY
    }
   )
}   

UserSchema.methods.generateRefershTokens = function() {
    return jwt.sign(
        {
            _id: this._id,
        
        },

        process.env.REFRESH_TOKEN,

        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }

    )
}




export const User = mongoose.model('User', UserSchema); 