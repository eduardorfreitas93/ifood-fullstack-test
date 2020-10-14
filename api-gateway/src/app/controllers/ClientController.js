let api = require('../../config/api')

const services = require('../services')

api = api(process.env.BASE_URI_CLIENT)

class ClientController {
  create (req, res) {
    const uriMicroservice = `${process.env.BASE_URI_CLIENT}${req.path}`

    services.QueueService._execute('queue_post_client', uriMicroservice, req.body)

    return res.json({ ok: true })
  }

  async list (req, res) {
    try {
      const resp = await api.get(req.path)

      return res.json(resp.data)
    } catch (err) {
      return res.status(err.status).json(err.message)
    }
  }
}

module.exports = new ClientController()
