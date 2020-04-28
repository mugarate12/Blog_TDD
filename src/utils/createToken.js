const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

function createToken(user) {
  return jwt.sign({
    id: user.id,
    username: user.username
  }, JWT_SECRET, {})
}

module.exports = createToken
