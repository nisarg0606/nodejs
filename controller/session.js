function login(req, res) {
    res.send("Login Page")
}

function forgetPassword(req, res) {
    res.send("Forget Password Page")
}

module.exports.login = login
module.exports.forgetPassword = forgetPassword