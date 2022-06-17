const express = require('express');
const mongoose = require('mongoose');
const session = require('./controller/session');
const app = express();
const calc = require('./controller/calc');
const checkPrime = require('./controller/PrimeNumber');
const magicNumber = require('./controller/MagicNumber');
const findMax = require('./controller/findMax');
const sessionController = require('./controller/sessionController');
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//connect to mongodb
mongoose.connect('mongodb://localhost/royaldb', () => console.log('connected to mongodb'));

//Restful API
app.get('/', function (req, res) {
    res.send('Hello World');
});
app.post('/login', session.login)
app.post('/forgetPassword', session.forgetPassword)
app.post('/signup', session.signup)
app.post('/resetPassword', session.resetPassword)
app.get('/getAllUsers', session.getAllUsers)

app.post('/add', calc.add)
app.post('/sub', calc.sub)

app.post('/prime', checkPrime.findPrime)
app.post('/magic', magicNumber.magicNumber)
app.post('/findMax', findMax.findMax)


//session controller
app.post('/register', sessionController.signup)
app.get('/getUsers', sessionController.getAllUsers)
app.post('/log', sessionController.login)
app.post('/forget', sessionController.forgetPassword)
app.post('/reset', sessionController.resetPassword)
app.post('/delete', sessionController.deleteUser)
app.get('/getUser', sessionController.getUser)

//start server
app.listen(8080, function () {
    console.log('Server is running on port 8080');
})