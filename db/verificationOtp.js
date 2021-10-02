'use strict';
const mongoose = require('mongoose');

const otpSchame = new mongoose.Schema({
    identity: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    otp:{
        type: String,
        default:null
    },
    expiration_time:{
        type: Date,
        required:true
    }
},{timestamps: true});

module.exports = mongoose.model("otpverify",otpSchame);
