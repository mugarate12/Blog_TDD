// const { verifyToken } = require('./../utils/token')
const jwt = require('jsonwebtoken')
const { promisify } = require('util')
const JWT_SECRET = process.env.JWT_SECRET

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({error: 'token not provided'})
  }

  const [scheme, token] = authHeader.split(' ')

  try {
    const decoded = await promisify(jwt.verify)(token, JWT_SECRET)

    req.userID = decoded.id
    return next()
  } catch (error) {
    return res.status(401).json({error: 'token invalid'})
  }
}
