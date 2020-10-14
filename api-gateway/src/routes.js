const express = require('express')

const routes = express.Router()

const controllers = require('./app/controllers')

routes.get('/clients', controllers.ClientController.list)
routes.get('/orders', controllers.OrderController.list)

routes.post('/clients', controllers.ClientController.create)
routes.post('/orders', controllers.OrderController.create)

routes.all('*', (req, res) => {
  return res.status(404).json({ error: 'Router not found' })
})

module.exports = routes
