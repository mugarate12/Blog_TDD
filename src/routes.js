const { Router } = require('express')
const { celebrate, Segments, Joi } = require('celebrate')

const auth = require('./middlewares/auth')

const UserController = require('./controllers/userController')
const ProfileController = require('./controllers/profileController')
const PostController = require('./controllers/postController')
const CommentController = require('./controllers/commentController')
const LikeController = require('./controllers/likeController')

const routes = Router()

// declaro minhas rotas
routes.post('/users', celebrate({
  [Segments.BODY]: Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
    name: Joi.string().required(),
    description: Joi.string().optional()
  })
}), UserController.create)
routes.put('/users', celebrate({
  [Segments.BODY]: Joi.object().keys({
    password: Joi.string().required(),
    newPassword: Joi.string().required()
  })
}), auth, UserController.updatePassoword)
routes.delete('/users', auth, UserController.remove)

routes.post('/profile', celebrate({
  [Segments.BODY]: Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required()
  })
}), ProfileController.login)
routes.put('/profile', celebrate({
  [Segments.BODY]: Joi.object().keys({
    description: Joi.string().required()
  })
}), auth, UserController.updateDescription)

routes.post('/posts', celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    content: Joi.string().required()
  })
}), auth, PostController.create)
routes.get('/posts', auth, PostController.index)
routes.get('/posts/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required()
  })
}), auth, PostController.indexUser)
routes.delete('/posts/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required()
  })
}), auth, PostController.delete)

routes.get('/posts/:id/comments', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required()
  })
}),auth, PostController.indexCommentsByPost)

routes.post('/comments', celebrate({
  [Segments.BODY]: Joi.object().keys({
    content: Joi.string().required(),
    postID: Joi.number().required()
  })
}), auth, CommentController.create)
routes.get('/comments/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required()
  })
}), auth, CommentController.index)
routes.put('/comments/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required()
  }),
  [Segments.BODY]: Joi.object().keys({
    content: Joi.string().required()
  })
}), auth, CommentController.update)
routes.delete('/comments/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required()
  })
}), auth, CommentController.remove)

routes.post('/likes', celebrate({
  [Segments.BODY]: Joi.object().keys({
    postID: Joi.number().required()
  })
}), auth, LikeController.create)
routes.get('/likes/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required()
  })
}), auth, LikeController.index)
routes.delete('/likes/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required()
  })
}), auth, LikeController.remove)

module.exports = routes
