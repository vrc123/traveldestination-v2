// Require package
const mongoose = require("mongoose");

// Create travel destination schema
const Schema = mongoose.Schema;
const TDSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title is required!"],
        validate: {
            validator(value) {
                return !value.match(/^[a-z]/)
            },
            message: "First character has to be uppercase!"
        }
    },
    description: {
        type: String,
        required: [true, "Description is required!"],
        validate: {
            validator(value) {
                return !value.match(/^[a-z]/)
            },
            message: "First character has to be uppercase!"
        }
    },
    dateFrom: {
        type: Date
    },
    dateTo: {
        type: Date
    },
    country: {
        type: String,
        required: [true, "Country is required!"],
        validate: {
            validator(value) {
                return !value.match(/^[a-z]|[0-9]/g);
            },
            message: "Country must not include a number, and the first character has to be uppercase?"
        },
    },
    location: {
        type: String,
        required: [true, "Location is required!"],
        validate: {
            validator(value) {
                return !value.match(/^[a-z]/)
            },
            message: "First character has to be uppercase!"
        }
    },
    latitude: {
        type: Number
    },
    longitude: {
        type: Number
    }
});

// Export user schema
module.exports = mongoose.model("TD", TDSchema);