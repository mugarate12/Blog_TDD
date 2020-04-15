const request = require('supertest')
const app = require('./../../src/app')
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

describe('Tests for a user credencials', () => {

  let createuser
  let LoggedTokenUser

  beforeAll(async (done) => {
    createuser = await request(app)
      .post('/users')
      .send({
        username: "Test USER",
        password: "passwordExample123",
        name: "Test da Test dos Test",
        description: "Eu sou o Robin"
      })

    LoggedTokenUser = await request(app)
      .post('/profile')
      .send({
        username: "Test USER",
        password: "passwordExample123"
      })


    expect(createuser.status).toBe(200)
    expect(LoggedTokenUser.status).toBe(200)
    done()
  })

  it('should a valid token when a user logs in', async () => {
    const decodedToken = jwt.verify(LoggedTokenUser.body.token, JWT_SECRET, (error, decoded) => {
      return decoded
    })
    
    expect(decodedToken.id).toBeGreaterThan(0)
  })
})