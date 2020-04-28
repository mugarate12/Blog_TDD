const bcrypt = require('bcryptjs')

async function createPasswordHash(password) {
  let salt = await bcrypt.genSalt()

  let newPassword = await bcrypt.hash(password, salt)
  return newPassword
}

async function comparePassword(password, hashPassword, res) {
  const isValidPassword = await bcrypt.compare(password, hashPassword)
  if (!isValidPassword) {
    return res.status(406).json({
      error: 'informações incorretas, por favor, vereficar se todas as credenciais foram enviadas corretamente'
    })
  }
  return
}

module.exports = {
  createPasswordHash,
  comparePassword
}
