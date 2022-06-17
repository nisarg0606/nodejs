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
    .has().digits(2)
    .has().not().spaces()
    .is().not().oneOf(['Passw0rd', 'Password123']);
const UserSchema = new Schema({
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
        minlength: 8,
        maxlength: 15,
        validate: {
            validator: function (value) {
                return schema.validate(value);
            }
    }
    },
    otp: {
        type: Number,
        default: 0
    },
}, {versionKey: false});

module.exports = mongoose.model('User', UserSchema);