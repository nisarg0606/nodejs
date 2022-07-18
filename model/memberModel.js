const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');

const MemberSchema = new Schema({
    MemberId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    houseId: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 100
    },
    memberName: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 100
    },
    dob: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required: true,
        trim: true
    },
    contactNumber: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 10,
        validate: {
            validator: function (value) {
                return validator.isNumeric(value);
            }
        }
    },
    gender: {
        type: String,
        required: true
    }
}, { versionKey: false });

module.exports = mongoose.model('Member', MemberSchema);