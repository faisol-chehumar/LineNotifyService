const server = require('express')
const request = require('request')
const bodyParser = require('body-parser')

const router = server.Router()

const PORT = process.env.PORT || 3000

server()
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false}))
  .get('/', (req, res) => res.send(`Hi there! This is a nodejs-line-api running on PORT: ${ PORT }`))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))