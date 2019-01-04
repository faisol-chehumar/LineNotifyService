const server = require('express')
const request = require('request')
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 3000

const router = server.Router()

router.post('/', (req, res, next) => {
  const token = req.body.token
  const msg = req.body.msq

  request({
    method: 'POST',
    uri: 'https://notify-api.line.me/api/notify',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    auth: {
      'bearer': token
    },
    form: {
      msg
    }
  }, (err, httpResponse, body) => {
    if(err) {
      console.error(err)
    } else {
      res.json({
        httpResponse,
        body
      })
    }
  })
})

server()
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false}))
  .get('/', (req, res) => res.send(`Hi there! This is a nodejs-line-api running on PORT: ${ PORT }`))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))