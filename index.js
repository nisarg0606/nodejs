const express = require('express');
const session = require('./session');
const app = express();


app.get('/', function (req, res) {
    res.send('Hello World');
});
app.get('/login', session.login)
app.get('/forgetPassword', session.forgetPassword)

app.listen(8080, function () {
    console.log('Server is running on port 8080');
})