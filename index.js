// === imports
// ==================================================
let https = require('https')
let express = require('express')
let app = express()
let path = require('path')
let bodyParser = require('body-parser')
var fs = require('fs')

// === constants
// ==================================================
const PORT = process.env.PORT || 443

// === configuration
// ==================================================
app.set('port', PORT)
app.use(express.static(path.join(__dirname, 'www')))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// === routers
// ==================================================
app.get("/status", function (req, res) {
  res.status(200).send({ status: 'ok' })
})

// === start server
// ==================================================
https.createServer({
  key: fs.readFileSync('ssl/rondinellimorais.local.key', 'utf8'),
  cert: fs.readFileSync('ssl/rondinellimorais.local.crt', 'utf8')
}, app).listen(PORT, () => {
  console.log(`[${new Date().toString()}] Server is running on ${PORT}...`)
  console.log("---------------\n")
})