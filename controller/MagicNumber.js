module.exports.magicNumber = function (req, res) {
    var n = parseInt(req.body.n)
    temp = (n * n) / n;
    if (n < 0) {
        return res.json({
            [temp]: -1
        })
    }
    else if (n % 2 == 0) {
        return res.json({
            [temp]: n * n
        })
    }
    else {
        return res.json({
            temp: n * n * n
        })
    }
}