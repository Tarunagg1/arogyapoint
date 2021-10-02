'use strict';
const mongoose = require('mongoose');

const bookDoctorSchema = new mongoose.Schema({
    doctorid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'doctor',
        required: true
    },
    pname:{
        type: String,
        required: true,
        trim: true,
    },
    pemail:{
        type: String,
        required:true,
        trim: true,
    },
    paymentmode:{
        type: String,
        required:true,
        trim: true,
        ennum:['paid','unpaid']
    },
    appointmentdate: {
        type: Date,
        required:true
    },
    doctorfee:{
        type: Number,
        required:true
    }
},{timestamps: true});

module.exports = mongoose.model("bookdoctor",bookDoctorSchema);
