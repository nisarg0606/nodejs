const validator = require('validator');
const passwordValidator = require('password-validator');

var schema = new passwordValidator();
schema
    .is().min(8)
    .is().max(15)
    .has().uppercase()
    .has().lowercase()
    .has().digits()
    .has().not().spaces()
    .is().not().oneOf(['Passw0rd', 'Password123']);

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

//valid email
function validEmail(email) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].email === email) {
            return users[i];
        }
    }
    return false;
}

//valid Email and Password
function validEmailAndPassword(email, password) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].email === email && users[i].password === password) {
            return true;
        }
    }
    return false;
}

//signup
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
    // if (password == undefined || password.trim().length == 0) {
    //     isError = true
    //     errorMessage.push({ "passwordError": "Please Enter Password" })
    // } if (!validator.isAlphanumeric(password)  || !validator.isLength(password, { min: 8 })) {
    //     isError = true
    //     errorMessage.push({ "passwordError": "Password must be alphanumeric and Password must be at least 8 characters" })
    // }
    if(schema.validate(password) == false){
        isError = true
        errorMessage.push({ "passwordError": "Password must be contain 1 uppercase, 1 lower case, 1 number and it must be at least 8 characters" })
    }
    
    if (isError) {
        res.json({
            "error": errorMessage,
            "status": -1,
            "msg": "Validation error",
            "user": req.body
        })
        return
    }
    else {
        //check if user already exists
        // let user = users.find(user => user.email === email)      // short method
        let user = validEmail(email)
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

//login
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
        // let user = users.find(user => user.email === email)
        if (validEmailAndPassword(email, password)) {
            res.json({
                status: 1,
                message: 'Login success',
                user: req.body
            })
            console.log(req.body.email);
        }
        else {
            res.json({
                status: -1,
                message: 'Password or Email is incorrect'
            })
        }
    }
}

//forgot password
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
        // let user = users.find(user => user.email === email)
        let user = validEmail(email)
        if (user) {
            let index = users.indexOf(user)
            users[index].otp = Math.floor(Math.random() * 1000000)
            res.json({
                status: 1,
                message: 'OTP to reset the password is: ' + user.otp,
                user: user
            })
        }
        else {
            res.json({
                status: -1,
                message: 'Email is incorrect'
            })
        }
    }
}

//Reset Password
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
        // let user = users.find(user => user.email === email)
        let user = validEmail(email)
        let index = users.indexOf(user)
        if (user.otp == -1) {
            res.json({
                status: -1,
                message: 'OTP is expired'
            })
        }
        else if (otp != users[index].otp) {
            isError = true
            errorMessage.push('OTP or email is incorrect')
        }
        else {
            if (!validator.isLength(password, { min: 8 })) {
                isError = true
                errorMessage.push("Password must be at least 8 characters")
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

//get all users
module.exports.getAllUsers = function (req, res) {
    res.json({
        status: 200,
        message: 'All Users',
        users: users
    })
}
module.exports.login = login
module.exports.forgetPassword = forgetPassword
module.exports.signup = signup
module.exports.resetPassword = resetPassword