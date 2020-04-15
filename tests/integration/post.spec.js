const request = require('supertest')
const app = require('./../../src/app')

describe('Tests for a post CRUD', () => {
  let token
  let createPost

  beforeAll(async (done) => {
    const userCreated = await request(app)
      .post('/users')
      .send({
        username: "post_test_user",
        password: "post_test_password",
        name: "Mateus",
        description: "Eu sou o Capuz Vermelho"
      })

    const loggedTokenUser = await request(app)
      .post('/profile')
      .send({
        username: "post_test_user",
        password: "post_test_password"
      })

    token = loggedTokenUser.body.token

    createPost = await request(app)
      .post('/posts')
      .set('Authorization', `bearer ${token}`)
      .send({
        title: "Sou um título",
        content: "Sou um conteúdo, falo sobre a vida, filosofia, e fora aquele que cê sabe quem"
      })

    done()
  })

  it('should a create a post', async () => {
    expect(createPost.body.id).toBeGreaterThan(0)
    expect(createPost.status).toBe(200)
  })
})