const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');

const EventSchema = new Schema({
    eventId: {
        type: objectId,
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
    userId: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 100
    },
    eventName: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 100
    },
    eventDate: {
        type: String,
        required: true,
        trim: true
    },
    eventEndDate: {
        type: String,
        required: true,
        trim: true
    },
    eventDetails: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 100
    },
    rent: {
        type: Number,
        required: true,
        trim: true
    },
    isAvailable: {
        type: Boolean,
        required: true,
        trim: true
    }
}, { versionKey: false });

module.exports = mongoose.model('Event', EventSchema);