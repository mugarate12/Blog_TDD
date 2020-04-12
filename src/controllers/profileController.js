const connection = require('./../database/connection')
const bcrypt = require('bcryptjs')
const { handleError } = require('./../utils/utils')
const { createToken } = require('./../utils/token')

const TABLENAME = 'users'

module.exports = {
  async login (req, res) {
    const { username, password } = req.body

    const user = await connection(TABLENAME)
      .where({
        username
      })
      .select('*')
      .first()
      .catch(error => handleError(error))
    
    // verifico se a busca foi feita com sucesso
    if (!user) {
      return res.status(406).json({
        error: 'usuario não encontrado, por favor, verificar informações'
      })
    }

    // verifico se o password informado é compativel com o password criptografado no banco
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return res.status(406).json({
        error: 'informações incorretas, por favor, vereficar se todas as credenciais foram enviadas corretamente'
      })
    }

    // crio o token
    const token = createToken({id: user.id})

    return res.status(200).json({token})

    // const token = createToken({})
  }
}