const request = require('supertest')
const app = require('./../../src/app')

describe('Tests for users routes', () => {
  it('should create a user', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        username: "matt_cardosoo",
        password: "majuge",
        name: "Mateus",
        description: "Eu sou o Batman"
      })

    expect(response.body.id).toBeGreaterThan(0)
    expect(response.status).toBe(200)
  })

  it('should find a user', async () => {
    const createuser = await request(app)
      .post('/users')
      .send({
        username: "Test USER",
        password: "passwordExample123",
        name: "Test da Test dos Test",
        description: "Eu sou o Robin"
      })

    const response = await request(app)
      .get(`/users/${createuser.body.id}`)

    expect(response.status).toBe(200)
  })
})
