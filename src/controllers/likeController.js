const connection = require('./../database/connection')
const { handleError } = require('./../utils/utils')

const TABLENAME = 'likes'

module.exports = {
  async create (req, res) {
    const userID = req.userID
    const { postID } = req.body

    const like = await connection(TABLENAME)
      .insert({
        userIDFK: userID,
        postIDFK: postID
      })
      .catch((error) => handleError(error, res))

    if (!like) {
      return res.status(406).json({
        error: 'impossivel dar like, verifique a informação do usuario e post'
      })
    }

    return res.status(200).json({liked: true})
  },

  async index (req, res) {
    const userID = req.userID
    const postID = req.params

    const numberLikes = await connection(TABLENAME)
      .where({
        postIDFK: postID,
        userIDFK: userID
      })
      .catch((error) => handleError(error, res))

    if (!numberLikes) {
      return res.status(406).json({
        error: 'impossivel verificar os likes, verifique a informação do usuario e post'
      })
    }
    
    return res.status(200).json({
      data: numberLikes,
      likes: numberLikes.length 
    })
  },

  async remove (req, res) {
    const userID = req.userID
    const postID = req.params

    const unlike = await connection(TABLENAME)
      .where({
        postIDFK: postID,
        userIDFK: userID
      })
      .catch((error) => handleError(error, res))
    
    if (!unlike) {
      return res.status(406).json({
        error: 'impossivel verificar os likes, verifique a informação do usuario e post'
      })
    }

    return res.status(200).json({liked: false})
  }
}