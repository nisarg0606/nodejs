const http = require("http")

http.createServer((req, res) => {
    let url = req.url
    if (url === "/") {
        res.write("Hello World")
        res.end()
    }
    else if (url == "/signup") {
        res.write("Signup Page")
        res.end()
    }
    else if (url == "/login") {
        res.write("Login Page")
        res.end()
    }
    else {
        res.write("404 Page Not Found")
        res.end()
    }
    // res.writeHead(200, { "Content-Type": "text/html" })
    // res.write("<h1>Hello World</h1>")
    // res.end()
}
).listen(8080)