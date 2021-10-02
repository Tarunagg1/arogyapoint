'use strict';
const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    dname: {
        type: String,
        trim: true,
        required: true
    },
    demail:{
        type: String,
        required: true,
        trim: true,
    },
    dnumber:{
        type: Number,
        required:true,
        trim: true,
    },
    fees:{
        type: Number,
        required:true,
        trim: true
    },
    isactive: {
        type: Boolean,
        default: true
    },
    isdeleted: {
        type: Boolean,
        default: false
    }
},{timestamps: true});

module.exports = mongoose.model("doctor",doctorSchema);
