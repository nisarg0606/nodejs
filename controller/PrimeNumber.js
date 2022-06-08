module.exports.findPrime = function(req, res) {
    var n = parseInt(req.body.n)
    if(n <= 1) {
        return res.json({
            prime: NaN
        })
    }
    for(var i = 2; i < n; i++) {
        if(n % i === 0) {
            return res.json({
                prime: false
                });
        }
    }
    return res.json({
        prime: true
        });
}