const bcrypt = require('bcryptjs')

async function createPasswordHash(password) {
  let salt = await bcrypt.genSalt()

  let newPassword = await bcrypt.hash(password, salt)
  return newPassword
}

module.exports = {
  createPasswordHash
}
