const request = require('supertest')
const app = require('./../../src/app')
const { verifyToken } = require('./../../src/utils/token')

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

  it('should a valid user be login', async () => {
    const decodedToken = verifyToken(LoggedTokenUser.body.token)
    
    expect(decodedToken.id).toBeGreaterThan(0)
  })

  // it('should a valid user be a update password', async () => {
  //   const token = LoggedTokenUser.body.token
  //   const idUser = LoggedTokenUser.body.user.id

  //   const updatedUser = await request(app)
  //     .put('/profile')
  //     .set('Authorization', `bearer ${token}`)
  //     .send({
  //       password: "passwordExample123",
  //       newPassword: "passwordExampleUpdated"
  //     })

  //   expect(updatedUser.status).toBe(200)
  // })
})