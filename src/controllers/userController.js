const connection = require('./../database/connection')
const { createPasswordHash } = require('./../utils/hashPassword')
const { handleError } = require('./../utils/utils')

const TABLENAME = 'users'

module.exports = {
  async create (req, res) {
    let { username, password, name, description = '' } = req.body
    password = await createPasswordHash(password)

    const userID = await connection(TABLENAME)
      .insert({
        username,
        password,
        name,
        description
      })
      .catch(error => handleError(error, res))

    return res.status(200).json({id: userID[0]})
  },

  async find (req, res) {
    const id = req.params.id

    const user = await connection(TABLENAME)
      .where({ id })
      .select('*')
      .first()
      .catch(error => handleError(error, res))

    if (!user) {
      return res.status(406).json({
        error: `item com id ${id} não encontrado`
      })
    }

    return res.status(200).json(user)
  },

  async index (req, res) {
    const users = await connection(TABLENAME)
      .select('*')
    
    res.status(200).json(users)
  }
}
