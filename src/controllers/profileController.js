const connection = require('./../database/connection')
const jwt = require('jsonwebtoken')

const { handleError } = require('./../utils/utils')
const { comparePassword } = require('./../utils/hashPassword')
const JWT_SECRET = process.env.JWT_SECRET

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
    await comparePassword(password, user.password)

    // crio o token
    const token = jwt.sign({ id: user.id }, JWT_SECRET, {})

    return res.status(200).json({token, user})

    // const token = createToken({})
  }
}
