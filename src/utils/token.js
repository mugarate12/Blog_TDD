const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET

function createToken(payload) {
  return jwt.sign({
    id: payload.id
  }, JWT_SECRET, {})
}

function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET, (error, decoded) => {
    if (error) return "token invalid"
    return decoded
  })
}

module.exports = {
  createToken,
  verifyToken
}
