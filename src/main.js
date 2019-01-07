const server = require('express')
const bodyParser = require('body-parser')
const request = require('request');

const { PORT, TOKEN } = require('../config')

const postHandler = (req, res, next) => {
  const { message } = req.body

  request({
    method: 'POST',
    uri: 'https://notify-api.line.me/api/notify',
    headers: {
      'Content-Type': 'application/json'
    },
    auth: {
      'bearer': TOKEN
    },
    form: {
      message
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
}

server()
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false}))
  .get('/', (req, res) => res.send(`Hi Mims there! This is a nodejs-line-api xx running on PORT: ${ PORT }`))
  .post('/', postHandler)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))