const UserModel = require('../model/userModel');


//signup --> start
module.exports.signup = function (req, res) {
    let user = new UserModel({
        firstName: req.body.firstName,
        email: req.body.email,
        password: req.body.password
    });
    user.save(function (err, success) {
        if (err) {
            res.json({
                status: -1,
                message: err
            })
        } else {
            res.json({
                status: 200,
                message: 'User created successfully',
                data: success
            })
        }
    })
} //signup --> end


//Get all users --> start
module.exports.getAllUsers = function (req, res) {
    UserModel.find(function (err, data) {
        if (err) {
            console.log("Error in getting all users");
            res.json({
                status: -1,
                message: err
            })
        } else {
            res.json({
                status: 200,
                message: 'Users fetched successfully',
                success: data
            })
        }
    })
}
// Get all users --> end


//Get user by id/email --> start
module.exports.getUser = function (req, res) {
    UserModel.findOne({
        email: req.body.email
    }, function (err, data) {
        if (err) {
            console.log("Error in getting user");
            res.json({
                status: -1,
                message: err
            })
        } else {
            res.json({
                status: 200,
                message: 'User fetched successfully',
                success: data
            })
        }
    })
}
//Get user by id/email --> end


//login --> start
module.exports.login = function (req, res) {
    let email = req.body.email
    let password = req.body.password
    let isError = false
    let errorMessage = []
    if (email == undefined || email.trim().length == 0) {
        isError = true
        errorMessage.push('Email is required')
    }
    if (password == undefined || password.trim().length == 0) {
        isError = true
        errorMessage.push('Password is required')
    }
    if (isError) {
        res.json({
            status: -1,
            message: errorMessage
        })
        return
    }
    else {
        UserModel.findOne({ email: email }, function (err, data) {
            if (err) {
                console.log("Error in getting user");
                res.json({
                    status: -1,
                    message: err
                })
            } else {
                if (data) {
                    if (data.password == password) {
                        res.json({
                            status: 200,
                            message: 'Login success',
                            data: data
                        })
                    }
                    else {
                        res.json({
                            status: -1,
                            message: 'Password is incorrect'
                        })
                    }
                }
                else {
                    res.json({
                        status: -1,
                        message: 'User not found'
                    })
                }
            }
        }
        )
    }
}
//login --> end

//forgot password --> start
module.exports.forgetPassword = function (req, res) {
    let email = req.body.email;
    let isError = false;
    let errorMessage = [];
    let otp = Math.floor(100000 + Math.random() * 900000);
    if (email == undefined || email.trim().length == 0) {
        isError = true
        errorMessage.push('Email is required')
    }
    if (isError) {
        res.json({
            status: -1,
            message: errorMessage
        })
        return
    }
    else {
        UserModel.findOneAndUpdate({ email: email }, { otp: otp }, function (err, data) {
            if (err) {
                console.log("Error in getting user");
                res.json({
                    status: -1,
                    message: err
                })
            } else {
                if (data) {
                    res.json({
                        status: 200,
                        message: 'Password sent to your email',
                        otp: otp
                    })
                }
                else {
                    res.json({
                        status: -1,
                        message: 'User not found'
                    })
                }
            }
        }
        )
    }
}
//forgot password --> end

//reset password --> start
module.exports.resetPassword = function (req, res) {
    let email = req.body.email
    let otp = req.body.otp
    let password = req.body.password
    let isError = false
    let errorMessage = []
    if (email == undefined || email.trim().length == 0) {
        isError = true
        errorMessage.push('Email is required')
    }
    if (otp == undefined || otp.trim().length == 0) {
        isError = true
        errorMessage.push('OTP is required')
    }
    if (password == undefined || password.trim().length == 0) {
        isError = true
        errorMessage.push('Password is required')
    }
    if (isError) {
        res.json({
            status: -1,
            message: errorMessage
        })
        return
    }
    else {
        UserModel.findOne({ email: email }, function (err, data) {
            if (err) {
                console.log("Error in getting user");
                res.json({
                    status: -1,
                    message: err
                })
            }
            else {
                if (data) {
                    if (data.otp == otp) {
                        data.password = password;
                        data.otp = -1;
                        data.save(function (err, success) {
                            if (err) {
                                res.json({
                                    status: -1,
                                    message: err
                                })
                            } else {
                                res.json({
                                    status: 200,
                                    message: 'Password reset successfully',
                                    data: success
                                })
                            }
                        }
                        )
                    }
                    else if (data.otp == -1) {
                        res.json({
                            status: -1,
                            message: 'OTP has been expired'
                        })
                    }
                    else {
                        res.json({
                            status: -1,
                            message: 'OTP is incorrect'
                        })
                    }
                }
                else {
                    res.json({
                        status: -1,
                        message: 'User not found'
                    })
                }
            }
        }
        )
    }
}
//reset password --> end

//delete user --> start
module.exports.deleteUser = function (req, res) {
    let email = req.body.email
    let password = req.body.password
    let isError = false
    let errorMessage = []
    if (email == undefined || email.trim().length == 0) {
        isError = true
        errorMessage.push('Email is required')
    }
    if (password == undefined || password.trim().length == 0) {
        isError = true
        errorMessage.push('Password is required')
    }
    if (isError) {
        res.json({
            status: -1,
            message: errorMessage
        })
        return
    }
    else {
        UserModel.findOneAndDelete({ email: email }, function (err, data) {
            if (err) {
                console.log("Error in getting user");
                res.json({
                    status: -1,
                    message: err
                })
            } else {
                if (data) {
                    if (data.password == password) {
                    res.json({
                        status: 200,
                        message: 'User deleted successfully',
                        data: data
                    })
                }
                else {
                    res.json({
                        status: -1,
                        message: 'Password or email is incorrect'
                    })
                }
                }
                else {
                    res.json({
                        status: -1,
                        message: 'User not found'
                    })
                }
            }
        }
        )
    }
}
//delete user --> end