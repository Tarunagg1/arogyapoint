'use strict';
const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    sname: {
        type: String,
        required: true,
        trim: true,
    },
    stype: {
        type: String,
        required: true,
        trim: true,
        enum: ['single', 'combo'],
        default: 'single'
    },
    isactive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model("service", serviceSchema);
