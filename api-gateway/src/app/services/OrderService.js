let api = require('../../config/api')

const ClientService = require('./ClientService')

api = api(process.env.BASE_URI_ORDER)

class OrderService {
  async listOrderWithClient (endpointPath, queryParams) {
    try {
      let apiPath = endpointPath

      if (queryParams.start || queryParams.end) apiPath = '/orders/search/byDate'

      const {
        data: {
          _embedded: {
            orders
          }
        }
      } = await api.get(apiPath, {
        params: queryParams
      })

      const orderArr = orders.map(async (item, index) => {
        try {
          const client = await ClientService.listByIdAndFilter(item.clientId, queryParams)

          item.totalPrice = this.calculateTotalPrice(item.items)
          this.calculateIndividualPrice(item.items)

          return item.client = client
        } catch (e) {
          return delete orders[index]
        }
      })

      await Promise.all(orderArr)

      return orders.filter(item => item)
    } catch (err) {
      return err.message
    }
  }

  calculateTotalPrice (items) {
    return items.reduce((a, b) => a + (b.price * b.quantity), 0)
  }

  calculateIndividualPrice (items) {
    return items.map(item => {
      const totalPrice = item.price * item.quantity
      return item.totalPrice = totalPrice
    })
  }
}

module.exports = new OrderService()
