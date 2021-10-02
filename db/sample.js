'use strict';
const mongoose = require('mongoose');

const sampleSchema = new mongoose.Schema({
    samplename: {
        type: String,
        trim: true,
        required: true
    },
    sampleprice:{
        type: Number,
        required: true,
        trim: true,
    },
    isactive:{
        type: Boolean,
        default: true
    }
},{timestamps: true});

module.exports = mongoose.model("sample",sampleSchema);
