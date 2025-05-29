import mongoose from "mongoose";
import { Schema } from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new Schema({
    email: {
        type: String,
        trim: true,
        required: "Email is required",
        unique: true
    },
    password: {
        type: String,
        required: "Password is required",
        min: 6,
        max: 64
    },
    firstBuy: {
        type: Number,
    },
    orders: {
        type: Array,
    },
    promocodes: {
        type: Array,
    },
    name: {
        type: String,
    },
    surName: {
        type: String,
    },
    phone: {
        type: Number,
    },
    oblast: {
        type: String,
    },
    city: {
        type: String,
    },
    viddil: {
        type: String,
    },
    bday: {
        type: Date,
    },
    cashback: {
        type: Number,
    },
},{timestamps: true})

userSchema.pre("save", function(next){
    let user = this;

    if(user.isModified("password")){
        return bcrypt.hash(user.password, 12, function(err, hash){
            if(err){
                console.log("Bcrypt has error", err)
                return next(err)
            }
            user.password = hash;
            return next()
        })
    } else{
        return next()
    }
})

userSchema.methods.comparePasswords = function(password,next){
    bcrypt.compare(password, this.password, function(err,match){
        if(err){
            console.log("COMPARE PASSWORD ERR", err)
            return next(err, false)
        }

        console.log("PASSWORDS MATCHED", true)
        return next(null, match)
    })
}

export default mongoose.model("User", userSchema)