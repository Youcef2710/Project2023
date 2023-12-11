const mongoose = require("mongoose")

// Créer le schema pour la  messagerie instantanée
const messageSchema = mongoose.Schema({

    // Identifiant de l'utilisateur qui envoie le message
    sender_id: { 
      type: String, 
      required: true, 
      maxLength: 100
    },

    // Identifiant de l'utilisateur qui reçoit le message
    receiver_id: { 
        type: String,  
        required: true,   
        maxLength: 100
    },  
 
    // Date d'envoi du message instantané
    sending_date: { 
        type: Date, 
        default: Date.now
    },

    // Date de reception du message
    reception_date: Date,

    // Tester si le message est lut ou pas
    read: { 
        type: Boolean, 
        default: false
    },
    
    // Si le message est supprimé
    deleted: { 
        type: Boolean, 
        default: false
    }
})

// Exporter le module Message
module.exports = mongoose.model("Message", messageSchema)