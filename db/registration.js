
'use strict';
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const adminregistrationSchema = new mongoose.Schema({
    name:{
        required: true,
        type:String
    },
    email:{
        required: true,
        type:String,
        unique: true,
        index: true
    },
    isactive:{
        type:Boolean,
        default: true
    }
}, {timestamps: true});

adminregistrationSchema.plugin(uniqueValidator, {message: 'Duplicate Entry {PATH}'});

const userModal = mongoose.model('adminregistration', adminregistrationSchema);

module.exports = userModal;