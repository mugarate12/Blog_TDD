const request = require('supertest')
const app = require('./../../src/app')
// const connection = require('./../../src/database/connection')s

describe('Tests for users routes', () => {

  it('should test', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        username: "matt_cardosoo",
        password: "majuge",
        name: "Mateus",
        description: "Eu sou o Batman"
      })

    expect(response.body.id).toBeGreaterThan(0)
  })
})
