module.exports.magicNumber = function (req, res) {
    var n = parseInt(req.body.n)
    temp = (n * n) / n;
    if (n < 0) {
        return res.json({
            n: -1
        })
    }
    else if (n % 2 == 0) {
        return res.json({
            n: n * n
        })
    }
    else {
        return res.json({
            n: n * n * n
        })
    }
}