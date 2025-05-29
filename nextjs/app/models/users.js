// /app/models/users.js
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
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
    cashback: {
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
    }
}, { timestamps: true });

userSchema.pre("save", async function() {
    const user = this;

    if (user.isModified("password")) {
        try {
            const hash = await bcrypt.hash(user.password, 12);
            user.password = hash; // Assign the hashed password
        } catch (err) {
            console.log("Bcrypt hash error", err);
            throw err; // Throw the error to be handled by Mongoose
        }
    }
});

userSchema.methods.comparePasswords = function(password) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, this.password, (err, match) => {
            if (err) {
                console.log("COMPARE PASSWORD ERR", err);
                return reject(err);
            }
            console.log("PASSWORDS MATCHED", match);
            return resolve(match);
        });
    });
};

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;