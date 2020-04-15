const request = require('supertest')
const app = require('./../../src/app')

describe('Tests for users routes', () => {

  let userCreated
  let loggedTokenUser

  beforeAll(async (done) => {
    userCreated = await request(app)
      .post('/users')
      .send({
        username: "matt_cardosoo",
        password: "majuge",
        name: "Mateus",
        description: "Eu sou o Batman"
      })

    loggedTokenUser = await request(app)
      .post('/profile')
      .send({
        username: "matt_cardosoo",
        password: "majuge"
      })

    expect(userCreated.status).toBe(200)
    expect(loggedTokenUser.status).toBe(200)
    done()
  })

  it('should create a user', async () => {
    expect(userCreated.body.id).toBeGreaterThan(0)
    expect(userCreated.status).toBe(200)
  })

  it('should a valid user be a update password', async () => {
    const token = loggedTokenUser.body.token

    const updatedUser = await request(app)
      .put('/users')
      .set('Authorization', `bearer ${token}`)
      .send({
        password: "majuge",
        newPassword: "passwordExampleUpdated"
      })

    expect(updatedUser.status).toBe(200)
  })  
})
