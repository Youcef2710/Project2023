const express = require('express')
const GuestController = require('../controllers/GuestController')
const GuestRouter = express.Router()

// Les routes pour les methodes non connectées
GuestRouter.post('/register', GuestController.Register)
GuestRouter.post('/login', GuestController.Login)

// Exporter le module
module.exports = GuestRouter