const connection = require('./../database/connection')
const { createPasswordHash, comparePassword } = require('./../utils/hashPassword')
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

    if (!userID) {
      return res.status(406).json({
        error: 'impossivel criar esse usuario, verifique se o username está disponivel'
      })
    }

    return res.status(200).json({id: userID[0]})
  },

  // async index (req, res) {
  //   const users = await connection(TABLENAME)
  //     .select('*')
    
  //   res.status(200).json({ data: users })
  // },

  async updatePassoword (req, res) {
    const id = req.userID
    let { password, newPassword } = req.body

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

    await comparePassword(password, user.password)

    newPassword = await createPasswordHash(newPassword)
    const userUpdated = await connection(TABLENAME)
      .where({ id })
      .update({
        password: newPassword
      })
      .catch((error) => handleError(error, res))

    if (!userUpdated) {
      return res.status(406).json({
        error: 'não foi possivel alterar a senha deste usuario, por favor, verifique os dados informados'
      })
    }

    return res.status(200).json({ userUpdated })
  },

  async updateDescription (req, res) {
    const id = req.userID
    let { description } = req.body

    const userUpdated = await connection(TABLENAME)
      .where({ id })
      .update({
        description
      })
      .catch((error) => handleError(error, res))
    
    if (!userUpdated) {
      return res.status(406).json({
        error: 'não foi possivel alterar a descrição deste usuario, por favor, verifique os dados informados'
      })
    }

    return res.status(200).json({ userUpdated })
  },

  async remove (req, res) {
    const id = req.userID

    const removedUser = await connection(TABLENAME)
      .where({ id })
      .del()
      .catch((error) => handleError(error, res))

    if (!removedUser) {
      return res.status(406).json({
        error: 'não foi possivel remover esse usuario, verificar informações'
      })
    }

    return res.status(200).json(removedUser)
  }
}
