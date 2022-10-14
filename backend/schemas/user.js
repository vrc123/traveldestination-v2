// Require package
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Create user schema
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    userName: {
        type: String,
        unique: true,
        required: [true, "User name is required!"],
        minLength: 8
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email address is required!"],
        validate: {
            validator(value) {
                return value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)
            },
            message: "Email address is not valid"
        }
    },
    password: {
        type: String,
        required: [true, "Password is required!"],
        minLength: 8
    },
});

// Middleware hash user password
UserSchema.pre("save", async function(next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});

// Export user schema
module.exports = mongoose.model("User", UserSchema);