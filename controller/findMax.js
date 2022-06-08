module.exports.findMax = function(req, res) {
    var n1 = parseInt(req.body.n1)
    var n2 = parseInt(req.body.n2)
    var n3 = parseInt(req.body.n3)
    var n4 = parseInt(req.body.n4)
    var n5 = parseInt(req.body.n5)
    var max = Math.max(n1, n2, n3, n4, n5)
    res.json({ max: max })
}