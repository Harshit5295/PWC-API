const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true
    },
    address: {
        street: {
            type: String,
            required: true
        },
        suite: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        zipCode: {
            type: String,
            required: true
        },
        geo: {
            lat: {
                type: String,
                required: true
            },
            lon: {
                type: String,
                required: true
            }
        }
    },
    company: {
        name: {
            type: String,
            required: true
        },
        catchPhrase: {
            type: String,
            required: true
        },
        bs: {
            type: String,
            required: true
        }
    }
});


const User = mongoose.model('User', userSchema);

module.exports = User;