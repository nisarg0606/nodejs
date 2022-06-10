const validator = require('validator');
function login(req, res) {
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
        let user = users.find(user => user.email === email)
        if (user) {
            if (user.password === password) {
                res.json({
                    status: 1,
                    message: 'Login success',
                    user: user
                })
                console.log(user.email);
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
                message: 'Email is incorrect'
            })
        }
    }

}

function forgetPassword(req, res) {
    res.send("Forget Password Page")
}
let users = [{
    "firstName": "John",
    "email": "john@gmail.com",
    "password": "john123",
    "userId": 1
},
{
    "firstName": "Jane",
    "email": "jane@gmail.com",
    "password": "jane123",
    "userId": 2
}]

function signup(req, res) {
    let firstName = req.body.firstName
    let email = req.body.email
    let password = req.body.password
    let userId = users.length + 1

    //validation
    let isError = false
    let errorMessage = []
    if (firstName == undefined || firstName.trim().length == 0) {
        isError = true
        errorMessage.push({ "firstName": "First name is required" })
    }
    if (email == undefined || email.trim().length == 0) {
        isError = true;
        errorMessage.push({
            "emailError": "Please Enter Email"
        })
    } else {

        if (!validator.isEmail(email)) {
            isError = true
            errorMessage.push({ "emailError": "Please Enter Valid Email" })
        }
    }
    if (password == undefined || password.trim().length == 0) {
        isError = true
        errorMessage.push({ "passwordError": "Please Enter Password" })
    } else {
        if (!validator.isLength(password, { min: 8 })) {
            isError = true
            errorMessage.push("Password must be at least 8 characters")
        }
    }
    if (isError) {
        res.json({
            "error": errorMessage,
            "status": -1,
            "msg": "Validation error"
        })
        return
    }
    else {
        //check if user already exists
        let user = users.find(user => user.email === email)
        if (user) {
            res.json({
                "message": "User already exists"
            })
            return
        } else {

            users.push({
                "firstName": firstName,
                "email": email,
                "password": password,
                "userId": userId
            })
            console.log(users);
            res.json({
                "message": "User created successfully",
                "status": 200
            })
        }
    }
}

function forgetPassword(req, res) {
    let email = req.body.email
    let isError = false
    let errorMessage = []
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
        let user = users.find(user => user.email === email)
        if (user) {
            let index = users.indexOf(user)
            users[index].otp = Math.floor(Math.random() * 1000000)
            res.json({
                status: 1,
                message: 'OTP to reset the password is: ' + user.otp,
                user: user
            })
        }
    }
}
function resetPassword(req, res) {
    let email = req.body.email
    let otp = req.body.otp
    let password = req.body.newpassword
    let isError = false
    let errorMessage = []
    if (email == undefined || email.trim().length == 0) {
        isError = true
        errorMessage.push('Email is required')
    }
    if (otp == undefined || otp.trim().length == 0) {
        isError = true
        errorMessage.push('OTP is required')
    } else {
        let user = users.find(user => user.email === email)
        let index = users.indexOf(user)
        if(user.otp == -1)
        {
            res.json({
                status: -1,
                message: 'OTP is expired'
            })
        }
        if (otp != users[index].otp) {
            isError = true
            errorMessage.push('OTP is incorrect')
        }
        else {
            // delete users[index].otp
            users[index].otp = -1
            users[index].password = password
            res.json({
                status: 1,
                message: 'Password updated successfully',
                user: user
            })
        }
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
}
module.exports.login = login
module.exports.forgetPassword = forgetPassword
module.exports.signup = signup
module.exports.resetPassword = resetPassword