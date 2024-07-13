const mongoose = require('mongoose');
const connect = mongoose.connect("mongodb://localhost:27017/login");

// Check database connected or not
connect.then(() => {
    console.log("Database Connected Successfully");
})
.catch(() => {
    console.log("Database cannot be Connected");
})

// Create Schema
const Loginschema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true, // Remove leading/trailing spaces
        lowercase: true, // Convert email to lowercase
        unique: true, // Ensure uniqueness
        validate: {
            validator: function (email) {
                // Regular expression for email validation
                const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
                return emailRegex.test(email);
            },
            message: 'Please provide a valid email address',
        },
    },
    phone: {
        type: String, // Use String type for phone numbers
        required: true,
        validate: {
            validator: function (phone) {
                // Regular expression for digits-only phone number
                const phoneRegex = /^\d+$/;
                return phoneRegex.test(phone);
            },
            message: 'Please provide a valid phone number (digits only)',
        },
    },
    password: {
        type: String,
        required: true
    }
});

// collection part
const collection = new mongoose.model("demotask", Loginschema);

module.exports = collection;