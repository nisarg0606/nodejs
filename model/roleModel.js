const Role = require('../models/roleModel');
// Get all roles --> start
module.exports.getAllRoles = function (req, res) {
    Role.find(function (err, data) {
        if (err) {
            console.log("Error in getting all roles");
            res.json({
                status: -1,
                message: err
            })
        } else {
            res.json({
                status: 200,
                message: 'Roles fetched successfully',
                success: data
            })
        }
    })
} // Get all roles --> end

// Get role by id --> start
module.exports.getRole = function (req, res) {
    Role.findOne({
        roleId: req.body.roleId
    }, function (err, data) {
        if (err) {
            console.log("Error in getting role");
            res.json({
                status: -1,
                message: err
            })
        } else {
            res.json({
                status: 200,
                message: 'Role fetched successfully',
                success: data
            })
        }
    })
} // Get role by id --> end

// Create role --> start
module.exports.createRole = function (req, res) {
    const role = new Role({
        roleId: req.body.roleId,
        roleName: req.body.roleName,
        roleDescription: req.body.roleDescription
    });
    role.save(function (err, data) {
        if (err) {
            console.log("Error in creating role");
            res.json({
                status: -1,
                message: err
            })
        } else {
            res.json({
                status: 200,
                message: 'Role created successfully',
                success: data
            })
        }
    })
} // Create role --> end

// Update role --> start
module.exports.updateRole = function (req, res) {
    Role.findOneAndUpdate({
        roleId: req.body.roleId
    }, {
        $set: {
            roleName: req.body.roleName,
            roleDescription: req.body.roleDescription
        }
    }, function (err, data) {
        if (err) {
            console.log("Error in updating role");
            res.json({
                status: -1,
                message: err
            })
        } else {
            res.json({
                status: 200,
                message: 'Role updated successfully',
                success: data
            })
        }
    })
} // Update role --> end

// Delete role --> start
module.exports.deleteRole = function (req, res) {
    Role.findOneAndDelete({
        roleId: req.body.roleId
    }, function (err, data) {
        if (err) {
            console.log("Error in deleting role");
            res.json({
                status: -1,
                message: err
            })
        } else {
            res.json({
                status: 200,
                message: 'Role deleted successfully',
                success: data
            })
        }
    })
} // Delete role --> end