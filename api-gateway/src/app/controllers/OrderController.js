const services = require('../services')

class OrderController {
  create (req, res) {
    const uriMicroservice = `${process.env.BASE_URI_ORDER}${req.path}`

    services.QueueService._execute('queue_post_order', uriMicroservice, req.body)

    return res.json({ ok: true })
  }

  async list (req, res) {
    try {
      const orders = await services.OrderService.listOrderWithClient(req.path, req.query)

      return res.json(orders)
    } catch (err) {
      return res.status(err.status).json(err.message)
    }
  }
}

module.exports = new OrderController()
