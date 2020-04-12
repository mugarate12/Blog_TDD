const connection = require('./../database/connection')
// const { createToken, verifyToken } = require('./../utils/token')
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

    // let token = createToken({id: 1})
    // let verify = verifyToken(token)
    return res.status(200).json({id: userID[0]})
  }
}
