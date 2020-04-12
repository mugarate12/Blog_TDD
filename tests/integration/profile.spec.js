const request = require('supertest')
const app = require('./../../src/app')
const { verifyToken } = require('./../../src/utils/token')

describe('Tests for a user credencials', () => {
  it('should a user be login', async () => {
    const createuser = await request(app)
      .post('/users')
      .send({
        username: "Test USER",
        password: "passwordExample123",
        name: "Test da Test dos Test",
        description: "Eu sou o Robin"
      })

      const LoggedTokenUser = await request(app)
        .post('/profile')
        .send({
          username: "Test USER",
          password: "passwordExample123"
        })
      
      const decodedToken = verifyToken(LoggedTokenUser.body.token)

      expect(decodedToken.id).toBeGreaterThan(0)
  });
});