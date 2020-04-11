const { createToken, verifyToken } = require('./../../src/utils/token')

let token
beforeAll((done) => {
  token = createToken({id: 1})
  done()
})

describe('Verify if token is valid', () => {
  it('should token was invalid', () => {
    let tokenDecoded = verifyToken(`${token}+1`)
    expect(tokenDecoded).toContain('token invalid')
  })
  
  it('should token was decoded', () => {
    let verify = verifyToken(token)

    expect(verify.id).toBeGreaterThan(0)
  })
})
