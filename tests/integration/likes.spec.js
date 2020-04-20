const request = require('supertest')
const app = require('./../../src/app')

describe('tests for a likes CRUD', () => {
  let token
  let createdPostID

  beforeAll(async (done) => {
    const userCreated = await request(app)
      .post('/users')
      .send({
        username: "post_test_user4",
        password: "post_test_password",
        name: "Mateus",
        description: "Eu sou o Capuz Vermelho"
      })

    const loggedTokenUser = await request(app)
      .post('/profile')
      .send({
        username: "post_test_user4",
        password: "post_test_password"
      })

    token = loggedTokenUser.body.token

    const createPost = await request(app)
      .post('/posts')
      .set('Authorization', `bearer ${token}`)
      .send({
        title: "Sou um título",
        content: "Sou um conteúdo, falo sobre a vida, filosofia, e fora aquele que cê sabe quem"
      })

    createdPostID = createPost.body.id

    done()
  })

  it('should a like a post', async () => {
    const likePost = await request(app)
      .post('/likes')
      .set('Authorization', `bearer ${token}`)
      .send({
        postID: createdPostID
      })

    expect(likePost.status).toBe(200)
  })

  it('should a likes by one post', async () => {
    const likesnumber = await request(app)
      .get(`/likes/${createdPostID}`)
      .set('Authorization', `bearer ${token}`)

    expect(likesnumber.status).toBe(200)
  })

  it('should a unlike a post', async () => {
    const unlike = await request(app)
      .delete(`/likes/${createdPostID}`)
      .set('Authorization', `bearer ${token}`)

    expect(unlike.status).toBe(200)
  })
})