const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: 'string',
        unique: true
    },
    nick: {
        type: 'string',
    },
    products: {
        type: 'array',
        default: []
    },
    purchased: {
        type: 'boolean',
        default: false
    }
})




module.exports = mongoose.model("User", userSchema);