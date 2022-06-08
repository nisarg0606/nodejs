module.exports.add = function (req, res) {
    console.log(req.body)
    console.log(req.body.n1)
    console.log(req.body.n2)
    ans = parseInt(req.body.n1) + parseInt(req.body.n2)
    res.json({ addition: ans })
}

module.exports.sub = function (req, res) {
    console.log(req.body)
    console.log(req.body.n1)
    console.log(req.body.n2)
    ans = parseInt(req.body.n1) - parseInt(req.body.n2)
    res.json({ subtraction: ans })
}