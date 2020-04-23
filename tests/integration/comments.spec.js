const request = require('supertest')
const app = require('./../../src/app')

describe('tests for a comments CRUD', () => {
  let token
  let createdPostID
  let createdComment

  beforeAll(async (done) => {
    const userCreated = await request(app)
      .post('/users')
      .send({
        username: "post_test_user3",
        password: "post_test_password",
        name: "Mateus",
        description: "Eu sou o Capuz Vermelho"
      })

    const loggedTokenUser = await request(app)
      .post('/profile')
      .send({
        username: "post_test_user3",
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

    createdComment = await request(app)
      .post('/comments')
      .set('Authorization', `bearer ${token}`)
      .send({
        content: "sou um conteudo de um comentario",
        postID: createdPostID
      })

    done()
  })

  it('should create a comment', async () => {
    expect(createdComment.status).toBe(201)
  })

  it('should not sucess to create comment', async () => {
    const allFieldsRequired = await request(app)
      .post('/comments')
      .set('Authorization', `bearer ${token}`)
      .send({
        content: "sou um conteudo de um comentario"
      })
    
    const invalidPost = await request(app)
      .post('/comments')
      .set('Authorization', `bearer ${token}`)
      .send({
        content: "sou um conteudo de um comentario",
        postID: 60
      })

      expect(allFieldsRequired.status).toBe(400)
      expect(invalidPost.status).toBe(409)
  })

  it('should get one comment by user', async () => {
    const commentSelected = await request(app)
      .get(`/comments/${createdComment.body.id}`)
      .set('Authorization', `bearer ${token}`)

    expect(commentSelected.status).toBe(200)
  })

  it('should get comments by post', async () => {
    const comments = await request(app)
      .get('/posts/comments')
      .set('Authorization', `bearer ${token}`)
      .send({
        postID: createdPostID
      })

    expect(comments.status).toBe(200)
  })

  it('should a update a comment', async () => {
    const updatedComment = await request(app)
      .put(`/comments/${createdComment.body.id}`)
      .set('Authorization', `bearer ${token}`)
      .send({
        content: "sou um novo conteudo de um comentario"
      })

    expect(updatedComment.status).toBe(200)
  })

  it('should invalid request for a update comment', async () => {
    const allFieldsRequired = await request(app)
      .put(`/comments/${createdComment.body.id}`)
      .set('Authorization', `bearer ${token}`)
      .send({})

    const InvalidCommentID = await request(app)
      .put('/comments/20000')
      .set('Authorization', `bearer ${token}`)
      .send({
        content: "sou um novo conteudo de um comentario"
      })
    
    expect(allFieldsRequired.status).toBe(400)
    expect(InvalidCommentID.status).toBe(406)
  })

  it('should a remove a comment', async () => {
    const removedComment = await request(app)
      .delete(`/comments/${createdComment.body.id}`)
      .set('Authorization', `bearer ${token}`)
    
    expect(removedComment.status).toBe(200)
  })

  it('should invalid request for a remove comment', async () => {
    const InvalidCommentID = await request(app)
      .delete('/comments/2000000')
      .set('Authorization', `bearer ${token}`)

    expect(InvalidCommentID.status).toBe(406)
  })
})