import { app } from '@/app'
import * as fs from 'fs'
import https from "https"

const port = process.env.PORT || 3000

// Подключение HTTPS
const privateKey = fs.readFileSync("/etc/ssl/certs/privkey.pem", "utf8")
const certificate = fs.readFileSync("/etc/ssl/certs/fullchain.pem", "utf8")
const credentials = { key: privateKey, cert: certificate }

// app.listen(port, () => {
//   console.log(
//     '\x1b[36m%s\x1b[0m',
//     'Server is running at http://localhost:' + port,
//   )
// })

https.createServer(credentials, app).listen(port, () => {
  console.log(`Server running on port` + port)
})
