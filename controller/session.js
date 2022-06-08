const validator = require('validator');
function login(req, res) {
    res.send("Login Page")
}

function forgetPassword(req, res) {
    res.send("Forget Password Page")
}
let users = [{
    "firstName": "John",
    "email" : "john@gmail.com",
    "password" : "john123", 
    "userId": 1
},
{
    "firstName": "Jane",
    "email" : "jane@gmail.com",
    "password" : "jane123",
    "userId": 2
}]

function signup(req, res) {
    let firstName = req.body.firstName
    let email = req.body.email
    let password = req.body.password
    let userId = users.length + 1

    //validation
    if(!firstName || !email || !password) {
        res.json({
            "message": "All fields are required"
        })
        return
    }
    if(!validator.isEmail(email)) {
        res.json({
            "message": "Invalid email"
        })
        return
    }
    if(!validator.isLength(password, {min: 8})) {
        res.json({
            "message": "Password must be at least 8 characters"
        })
        return
    }
    //check if user already exists
    let user = users.find(user => user.email === email)
    if(user) {
        res.json({
            "message": "User already exists"
        })
        return
    }
    users.push({
        "firstName": firstName,
        "email" : email,
        "password" : password,
        "userId": userId
    })

    console.log(users);
    res.json({
        "message": "User created successfully"
    })
}
    
module.exports.login = login
module.exports.forgetPassword = forgetPassword
module.exports.signup = signup