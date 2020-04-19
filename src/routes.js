const { Router } = require('express')

const UserController = require('./controllers/userController')
const ProfileController = require('./controllers/profileController')
const PostController = require('./controllers/postController')
const CommentController = require('./controllers/commentController')
const LikeController = require('./controllers/likeController')
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
routes.get('/comments/:id', auth, CommentController.index)
routes.put('/comments/:id', auth, CommentController.update)
routes.delete('/comments/:id', auth, CommentController.remove)

routes.post('/likes', auth, LikeController.create)
routes.get('/likes/:id', auth, LikeController.index)
routes.delete('/likes/:id', auth, LikeController.remove)

module.exports = routes
