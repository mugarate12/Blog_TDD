const connection = require('./../database/connection')
const bcrypt = require('bcryptjs')
const { createPasswordHash } = require('./../utils/hashPassword')
const { handleError } = require('./../utils/utils')

const TABLENAME = 'users'

module.exports = {
  async create (req, res) {
    let { username, password, name, description = '' } = req.body
    password = await createPasswordHash(password)

    await connection(TABLENAME)
      .insert({
        username,
        password,
        name,
        description
      })
      .then(userID => res.status(201).json({ id: userID[0] }))
      .catch(error => handleError(error, res, "username invalido, por favor, utilizar outro"))
  },

  async updatePassoword (req, res) {
    const id = req.userID
    const username = req.username
    let { password, newPassword } = req.body

    await connection(TABLENAME)
      .where({
        id,
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

        newPassword = await createPasswordHash(newPassword)
        await connection(TABLENAME)
          .where({ id })
          .update({
            password: newPassword
          })
          .then(userUpdated => res.status(200).json({ userUpdated }))
          .catch((error) => handleError(error, res, "não foi possivel alterar a senha deste usuario, por favor, verifique os dados informados"))
        })
      .catch(error => handleError(error, res, `usuario com id ${id} não encontrado`))
  },

  async updateDescription (req, res) {
    const id = req.userID
    const username = req.username
    let { description } = req.body

    await connection(TABLENAME)
      .where({
        id,
        username
      })
      .update({
        description
      })
      .then(userUpdated => res.status(200).json({ userUpdated }))
      .catch((error) => handleError(error, res, "não foi possivel fazer essa atualização, por favor, verifique as informações do usuario"))
  },

  async updateName (req, res) {
    const id = req.userID
    const username = req.username
    const { name } = req.body

    await connection(TABLENAME)
      .where({
        id,
        username
      })
      .update({
        name
      })
      .then(userUpdated => res.status(200).json({}))
      .catch((error) => handleError(error, res, "não foi possivel fazer alterar o nome, por favor, verifique as informações do usuario"))
  },

  async remove (req, res) {
    const id = req.userID
    const username = req.username

    await connection(TABLENAME)
      .where({
        id,
        username
      })
      .del()
      .then(user => res.status(200).json({}))
      .catch((error) => handleError(error, res, 'não foi possivel remover esse usuario, verificar informações'))
  }
}
