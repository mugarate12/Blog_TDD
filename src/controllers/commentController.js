const connection = require('./../database/connection')
const { handleError } = require('./../utils/utils')

const TABLENAME = 'comments'

module.exports = {
  async create (req, res) {
    const { content, postID } = req.body
    const userID = req.userID

    const createdComment = await connection(TABLENAME)
      .insert({
        content,
        userIDFK: userID,
        postIDFK: postID
      })
      .catch((error) => handleError(error, res))

    if (!createdComment) {
      return res.status(406).json({
        error: 'impossivel criar comment, verifique a informação do usuario e post'
      })
    }

    return res.status(200).json({ id: createdComment[0] })
  },

  async index (req, res) {
    const userID = req.userID
    const id = req.params

    const comment = await connection(TABLENAME)
      .select('*')
      .where({
        id,
        userIDFK: userID
      })
      .catch((error) => handleError(error, res))

    if (!comment) {
      return res.status(406).json({
        error: 'impossivel achar comment, verifique a informação do usuario e post'
      })
    }

    return res.status(200).json(comment)
  }, 

  async update (req, res) {
    const userID = req.userID
    const id = req.params
    let  { content } = req.body

    const commentUpdated = await connection(TABLENAME)
      .where({ 
        id,
        userIDFK: userID
      })
      .update({
        content
      })
      .catch((error) => handleError(error, res))

    if (!commentUpdated) {
      return res.status(406).json({
        error: 'impossivel alterar comment, verifique a informação do usuario e post'
      })
    }

    return res.status(200).json({id: commentUpdated})
  },

  async remove (req, res) {
    const userID = req.userID
    const id = req.params

    const removedComment = await connection(TABLENAME)
      .where({
        id,
        userIDFK: userID
      })
      .del()
      .catch((error) => handleError(error, res))

    if (!removedComment) {
      return res.status(406).json({
        error: 'não foi possivel remover esse comment, verificar informações'
      })
    }

    return res.status(200).json(removedComment)
  }
}