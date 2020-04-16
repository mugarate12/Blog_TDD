const { Router } = require('express')

const UserController = require('./controllers/userController')
const ProfileController = require('./controllers/profileController')
const PostController = require('./controllers/postController')
const CommentController = require('./controllers/commentController')
const auth = require('./middlewares/auth')

const routes = Router()

routes.get('/', (req, res) => {  })

// declaro minhas rotas
routes.post('/users', UserController.create)
routes.get('/users', auth, UserController.index)
routes.put('/users', auth, UserController.updatePassoword)
routes.delete('/users', auth, UserController.remove)

routes.post('/profile', ProfileController.login)
routes.put('/profile', auth, UserController.updateDescription)

routes.post('/posts', auth, PostController.create)
routes.get('/posts', auth, PostController.index)
routes.get('/posts/:id', auth, PostController.indexUser)
routes.delete('/posts/:id', auth, PostController.delete)

routes.post('/comments', auth, CommentController.create)

module.exports = routes
