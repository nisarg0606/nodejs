const express = require('express');
const session = require('./controller/session');
const app = express();
const calc = require('./controller/calc');
const checkPrime = require('./controller/PrimeNumber');
const magicNumber = require('./controller/MagicNumber');
const findMax = require('./controller/findMax');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', function (req, res) {
    res.send('Hello World');
});
app.get('/login', session.login)
app.get('/forgetPassword', session.forgetPassword)
app.post('/signup', session.signup)


app.post('/add', calc.add)
app.post('/sub', calc.sub)

app.post('/prime', checkPrime.findPrime)
app.post('/magic', magicNumber.magicNumber)
app.post('/findMax', findMax.findMax)
app.listen(8080, function () {
    console.log('Server is running on port 8080');
})