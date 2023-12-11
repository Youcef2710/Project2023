const express = require('express')
const MessageController = require('../controllers/MessageController')
const MessageRouter = express.Router()

// Routes de la messagerie
MessageRouter.post('/send-message', MessageController.SendMessage)
MessageRouter.delete('/:id', MessageController.DeleteMessage)
MessageRouter.get('/:sender_id/:receiver_id', MessageController.GetConversation)
MessageRouter.get('/', MessageController.GetAll)

// Exportation du router
module.exports = MessageRouter