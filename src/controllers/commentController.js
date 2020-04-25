const connection = require('./../database/connection')
const { handleError } = require('./../utils/utils')

const TABLENAME = 'comments'

module.exports = {
  async create (req, res) {
    const { content, postID } = req.body
    const userID = req.userID

    await connection(TABLENAME)
      .insert({
        content,
        userIDFK: userID,
        postIDFK: postID
      })
      .then(createdComment => res.status(201).json({ id: createdComment[0] }))
      .catch((error) => handleError(error, res, 'impossivel criar comment, verifique a informação do usuario e post'))
  },

  async index (req, res) {
    const userID = req.userID
    const { id } = req.params

    await connection(TABLENAME)
      .select('*')
      .where({
        id,
        userIDFK: userID
      })
      .then(comment => res.status(200).json({ data: comment }))
      .catch((error) => handleError(error, res, 'impossivel achar comment, verifique a informação do usuario e post'))
  }, 

  async update (req, res) {
    const userID = req.userID
    const { id } = req.params
    let  { content } = req.body

    await connection(TABLENAME)
      .where({ 
        id,
        userIDFK: userID
      })
      .update({
        content
      })
      .then(commentUpdated => {
        if (commentUpdated === 0) {
          return res.status(406).json({error: "comentario invalido, verificar essa informação"})
        }

        return res.status(200).json({ id: commentUpdated })
      })
      .catch((error) => handleError(error, res, 'impossivel alterar comment, verifique a informação do usuario e post'))
  },

  async remove (req, res) {
    const userID = req.userID
    const { id } = req.params

    await connection(TABLENAME)
      .where({
        id,
        userIDFK: userID
      })
      .del()
      .then(removedComment => {
        if (removedComment === 0) {
          return res.status(406).json({error: "comentario invalido, verificar essa informação"})
        }

        return res.status(200).json({ id: removedComment })
      })
      .catch((error) => handleError(error, res, 'não foi possivel remover esse comment, verificar informações'))
  }
}