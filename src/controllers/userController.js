const connection = require('./../database/connection')

module.exports = {
  async create (req, res) {
    let name = 'name'

    res.json({name})
  }
}
