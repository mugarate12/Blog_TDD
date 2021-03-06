const connection = require('./../database/connection')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { handleError } = require('./../utils/utils')
const createToken = require('./../utils/createToken')

const TABLENAME = 'users'

module.exports = {
  async login (req, res) {
    const { username, password } = req.body

    await connection(TABLENAME)
      .where({
        username
      })
      .select('*')
      .first()
      .then(async user => {
        const inValidPassword = await bcrypt.compare(password, user.password)
        if (!inValidPassword) {
          return res.status(406).json({
            error: 'informações incorretas, por favor, vereficar se todas as credenciais foram enviadas corretamente'
          })
        }
        delete user.password

        const token = createToken(user)
        return res.status(200).json({ token, user })
      })
      .catch(error => handleError(error, res, "usuario não encontrado, por favor, verificar informações"))
  },

  async findUser (req, res) {
    const { username } = req.params

    await connection(TABLENAME)
      .select('id', 'username', 'name', 'description')
      .where({
        username
      })
      .first()
      .then(user => res.status(200).json({ data: user}))
      .catch(error => handleError(error, res, "impossivel realizar busca, por favor, verifique as informações"))
  }
}
