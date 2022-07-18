const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const RoleSchema = new Schema({
    roleId: {
        type: objectId,
        required: true,
        unique: true,
        trim: true
    },
    roleName: {
        type: String,
        required: true,
        trim: true
    },
    roleDescription: {
        type: String,
        required: true,
        trim: true
        }
        }, {versionKey: false});
module.exports = mongoose.model('Role', RoleSchema);