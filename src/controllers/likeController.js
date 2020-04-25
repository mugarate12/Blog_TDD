const connection = require('./../database/connection')
const { handleError } = require('./../utils/utils')

const TABLENAME = 'likes'

module.exports = {
  async create (req, res) {
    const userID = req.userID
    const { postID } = req.body

    await connection(TABLENAME)
      .insert({
        userIDFK: userID,
        postIDFK: postID
      })
      .then(like => res.status(201).json({liked: true}))
      .catch((error) => handleError(error, res, 'impossivel dar like, verifique a informação do usuario e post'))
  },

  async index (req, res) {
    const userID = req.userID
    const { id } = req.params

    const numberLikes = await connection(TABLENAME)
      .where({
        postIDFK: id,
        userIDFK: userID
      })
      .then(numberLikes => res.status(200).json({
        data: numberLikes,
        likes: numberLikes.length 
      }))
      .catch((error) => handleError(error, res, 'impossivel verificar os likes, verifique a informação do usuario e post'))
  },

  async remove (req, res) {
    const userID = req.userID
    const { id } = req.params

    await connection(TABLENAME)
      .where({
        postIDFK: id,
        userIDFK: userID
      })
      .then(unlike => res.status(200).json({liked: false}))
      .catch((error) => handleError(error, res, 'impossivel remover like, verifique a informação do usuario e post'))
  }
}