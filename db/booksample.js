'use strict';
const mongoose = require('mongoose');

const bookSampleSchema = new mongoose.Schema({
    sampleid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sample',
        required: true
    },
    uniqueid: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    samplename: {
        type: String,
        required: true,
        trim: true,
    },
    bookdate: {
        type: Date,
        required: true,
        trim: true,
    },
    patientname: {
        type: String,
        required: true,
        trim: true,
    },
    patientnumber: {
        type: String,
        required: true,
        trim: true,
    },
    gender: {
        type: String,
        required: true,
        trim: true,
    },
    file: {
        type: String
    },
    paymentmode: {
        type: String,
        required: true,
        trim: true,
        ennum: ['paid', 'unpaid']
    },
    testfee: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("booksample", bookSampleSchema);
