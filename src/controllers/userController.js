const connection = require('./../database/connection')
const { createToken, verifyToken } = require('./../utils/token')

module.exports = {
  async create (req, res) {
    let name = 'name'

    let token = createToken({id: 1})
    let verify = verifyToken(token)

    res.json({name})
  }
}
