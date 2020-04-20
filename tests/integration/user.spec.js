const request = require('supertest')
const app = require('./../../src/app')

describe('Tests for users routes', () => {
  let userCreated
  let loggedTokenUser
  let token

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

    token = loggedTokenUser.body.token

    expect(userCreated.status).toBe(200)
    expect(loggedTokenUser.status).toBe(200)
    done()
  })

  it('should create a user', async () => {
    expect(userCreated.body.id).toBeGreaterThan(0)
    expect(userCreated.status).toBe(200)
  })

  it('should a valid user be a update password', async () => {
    const updatedUser = await request(app)
      .put('/users')
      .set('Authorization', `bearer ${token}`)
      .send({
        password: "majuge",
        newPassword: "passwordExampleUpdated"
      })

    expect(updatedUser.status).toBe(200)
  })

  it('should a valid user be a update description', async () => {
    const updatedUser = await request(app)
      .put('/profile')
      .set('Authorization', `bearer ${token}`)
      .send({
        description: "Olá, eu sou uma descrição"
      })

    expect(updatedUser.status).toBe(200)
  })

  it('should a valid user request remove yourself', async () => {
    const removedUser = await request(app)
      .delete('/users')
      .set('Authorization', `bearer ${token}`)

    expect(removedUser.status).toBe(200)
  })
})
