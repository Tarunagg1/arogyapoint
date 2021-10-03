'use strict';
const mongoose = require('mongoose');

const subServiceSchema = new mongoose.Schema({
    serviceid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'service',
        required: true
    },
    sbsname: {
        type: String,
        required: true,
        trim: true,
    },
    sbsprice: {
        type: Number,
        required: true,
        trim: true,
    },
    isactive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model("subservice", subServiceSchema);
