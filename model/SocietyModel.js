const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');

const SocietySchema = new Schema({
    // societyId
    // societyName
    // societyAddress
    //  societyCity
    // pinCode
    // noOfHouses
    societyId: {
        type: objectId,
        required: true,
        unique: true,
        trim: true
    },
    societyName: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 100
    },
    societyAddress: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 100
    },
    societyCity: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 20
    },
    pinCode: {
        type: Number,
        required: true,
        trim: true,
        minlength: 6,
        maxlength: 6
    },
    noOfHouses: {
        type: Number,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 100
    }
}, { versionKey: false });

module.exports = mongoose.model('Society', SocietySchema);