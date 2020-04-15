const connection = require('./../database/connection')
const { handleError } = require('./../utils/utils')

const TABLENAME = 'posts'

module.exports = {
  async create (req, res) {
    const id = req.userID
    const { title, content } = req.body

    const createdPost = await connection(TABLENAME)
      .insert({
        title,
        content,
        userIDFK: id
      })
      .catch((error) => handleError(error, res))

    if (!createdPost) {
      return res.status(406).json({
        error: 'impossivel criar post, verifique a informação do usuario'
      })
    }

    return res.status(200).json({id: createdPost[0]})
  }
}