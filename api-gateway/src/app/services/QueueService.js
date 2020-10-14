const amqp = require('amqplib/callback_api')

const rabbitmqConfig = require('../../config/rabbitmq')

class QueueService {
  async _execute (nameQueue, uriMicroservice, data) {
    amqp.connect(rabbitmqConfig.host, (err, conn) => {
      conn.createChannel((err, ch) => {
        ch.assertQueue(nameQueue)
        ch.sendToQueue(nameQueue, Buffer.from(JSON.stringify({ uriMicroservice, data })))
      })
    })
  }
}

module.exports = new QueueService()
