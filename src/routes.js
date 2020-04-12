const { Router } = require('express')

const UserController = require('./controllers/userController')
const ProfileController = require('./controllers/profileController')

const routes = Router()

routes.get('/', (req, res) => {  })

// declaro minhas rotas
routes.post('/users', UserController.create)
routes.get('/users', UserController.index)

routes.post('/profile', ProfileController.login)

module.exports = routes
