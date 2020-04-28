const request = require('supertest')
const app = require('./../../src/app')

describe('Tests for a post CRUD', () => {
  let token
  let createPost

  beforeAll(async (done) => {
    await request(app)
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

  it('should create a post', async () => {
    expect(createPost.body.id).toBeGreaterThan(0)
    expect(createPost.status).toBe(201)
  })

  it('should not create a post', async () => {
    allFieldsRequired = await request(app)
      .post('/posts')
      .set('Authorization', `bearer ${token}`)
      .send({
        title: "Sou um título"
      })

    tokenRequired = await request(app)
      .post('/posts')
      .send({
        title: "Sou um título",
        content: "Sou um conteúdo, falo sobre a vida, filosofia, e fora aquele que cê sabe quem"
      })
    
    // console.log(allFieldsRequired.body)
    expect(allFieldsRequired.status).toBe(400)
    expect(tokenRequired.status).toBe(401)
  })

  it('should get posts by user', async () => {
    const postByUser = await request(app)
      .get('/posts')
      .set('Authorization', `bearer ${token}`)

    expect(postByUser.status).toBe(200)
  })

  it('should get post by user different with a logged user', async () => {
    const newUser = await request(app)
      .post('/users')
      .send({
        username: "post_test_user2",
        password: "post_test_password",
        name: "Mateus",
        description: "Eu sou o Capuz Vermelho"
      })

    const posts = await request(app)
      .get(`/posts/${newUser.body.id}`)
      .set('Authorization', `bearer ${token}`)

    expect(posts.status).toBe(200)
  })

  it('should remove a post', async () => {
    const removedPost = await request(app)
      .delete(`/posts/${createPost.body.id}`)
      .set('Authorization', `bearer ${token}`)
      
    expect(removedPost.status).toBe(200)
  })

  it('should get response error for a not valid post for remove', async () => {
    const invalidPostRemove = await request(app)
      .delete('/posts/2000')
      .set('Authorization', `bearer ${token}`)

    expect(invalidPostRemove.status).toBe(406)
  })
})