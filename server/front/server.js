const dotenv = require("dotenv")
const fs = require("fs")
const https = require("https")
const next = require("next")

dotenv.config()

const privateKey = fs.readFileSync("/keys/privkey.pem", "utf8")
const certificate = fs.readFileSync("/keys/fullchain.pem", "utf8")
const credentials = { key: privateKey, cert: certificate }

const dev = process.env.NODE_ENV !== "production"
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
    const server = https.createServer(credentials, (req, res) => {
        handle(req, res)
    })

    server.listen(443, err => {
        if (err) throw err
        console.log("Frontend (Next.js) is running on port 443")
    })
})