const connection = require('./../database/connection')
const { handleError } = require('./../utils/utils')

const TABLENAME = 'posts'

module.exports = {
  async create (req, res) {
    const id = req.userID
    const { title, content } = req.body

    await connection(TABLENAME)
      .insert({
        title,
        content,
        userIDFK: id
      })
      .then(createdPost => res.status(201).json({id: createdPost[0]}))
      .catch((error) => handleError(error, res, "impossivel criar post, verifique a informação do usuario"))
  },

  async index (req, res) {
    const userID = req.userID

    await connection(TABLENAME)
      .where({ userIDFK: userID})
      .select('*')
      .then(posts => res.status(200).json({ data: posts }))
      .catch(error => handleError(error, res, 'não foi possivel encontrar posts deste usuario'))
  },

  async indexUser (req, res) {
    const { id } = req.params

    await connection(TABLENAME)
      .where({ id })
      .select('*')
      .then(posts => res.status(200).json({ data: posts }))
      .catch(error => handleError(error, res, 'não foi possivel encontrar posts deste usuario'))
  },

  async indexCommentsByPost (req, res) {
    const { id } = req.params

    await connection('comments')
      .where({
        postIDFK: id,
      })
      .select('*')
      .then(comments => res.status(200).json({data: comments}))
      .catch(error => handleError(error, res, 'erro ao buscar comentarios, verificar informação'))
  },

  async delete (req, res) {
    const { id } = req.params
    const userID = req.userID

    await connection(TABLENAME)
      .where({ 
        id,
        userIDFK: userID
      })
      .del()
      .then(removedPost => {
        if (removedPost === 0) {
          return res.status(406).json({error: "post invalido, verificar essa informação"})
        }

        return res.status(200).json({})
      })
      .catch(error => handleError(error, res, 'não foi possivel remover esse post, verificar informações do post ou usuario'))
  }
}