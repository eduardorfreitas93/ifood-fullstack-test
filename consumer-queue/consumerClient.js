require('dotenv').config()

const amqp = require('amqplib/callback_api')
const axios = require('axios')
const rabbitmqConfig = require('./config/rabbitmq')

amqp.connect(rabbitmqConfig.host, (err, conn) => {
  conn.createChannel((err, ch) => {
    const q = 'queue_post_client'

    ch.assertQueue(q)
    ch.prefetch(1)

    ch.consume(q, (msg) => {
      console.log('[x] Received %s', msg.content.toString())
      const message = msg.content.toString()

      if (typeof message === 'string') {
        const { uriMicroservice, data } = JSON.parse(message)

        axios.post(uriMicroservice, data)
          .then(() => {
            ch.ack(msg)
          })
      }
    })
  })
})
