let api = require('../../config/api')

api = api(process.env.BASE_URI_CLIENT)

class ClientService {
  async listByIdAndFilter (clientId, queryParams) {
    try {
      const client = await api.get('/clients/search/byCustomQuery', {
        params: { clientId, ...queryParams }
      })

      return client.data
    } catch (err) {
      throw err.message
    }
  }
}

module.exports = new ClientService()
