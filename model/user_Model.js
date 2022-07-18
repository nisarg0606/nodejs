const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const passwordValidator = require('password-validator');
var schema = new passwordValidator();
schema
    .is().min(8)
    .is().max(15)
    .has().uppercase()
    .has().lowercase()
    .has().digits(1)
    .has().not().spaces()
    .is().not().oneOf(['Passw0rd', 'Password123']);

const User_Schema = new Schema({
    userId: {
        type: objectId,
        required: true,
        unique: true,
        trim: true
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 100,
        validate: {
            validator: function (value) {
                return /^[a-zA-Z]+$/.test(value);
            }
        }
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 100,
        validate: {
            validator: function (value) {
                return /^[a-zA-Z]+$/.test(value);
            }
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: function (value) {
                return validator.isEmail(value);
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return schema.validate(value);
            }
        }
    },
    houseId: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 100
    },
    roleId: {
        type: String,
        required: true,
        trim: true
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
                return /^[0-9]+$/.test(value);
            }
        }
    },
    gender: {
        type: String,
        required: true,
        trim: true
    },
}, {versionKey: false});

module.exports = mongoose.model('User_', User_Schema);