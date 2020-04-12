const { Router } = require('express')

const UserController = require('./controllers/userController')

const routes = Router()

// declaro minhas rotas
routes.post('/users', UserController.create)

module.exports = routes
