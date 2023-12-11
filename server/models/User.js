const mongoose = require("mongoose")

// Créer un schema pour l'utilisateur
const userSchema = mongoose.Schema({

    // Prénom de l'utilisateur
    first_name: {
        type: String,
     
    },

    // Patronime de l'utilisateur
    last_name: {
        type: String,
        
    },

    // Nom utilisateur
    username: {
        type: String
    },

    // 0556555555 ou +213556250046
    phone_number: {
        type: String
       
    },

    // Date de naissance
    birth_date: Date,

    // Genre de l'utilisateur
    gender: {
        type: String,
       
    },
    
    // Email de l'utilisateur
    email: {
        type: String,
  
    },

    // Mot de passe de l'utilisateur
    password: {
        type: String,
    },

    // Type d'utilisateur : Interne ou Externe
    // L'utilisateur externe utilisera le protocole SMTP/IMAP/POP3
    user_type: {
        type: Number,

        default: 0 // 0 Pour un utilisateur interne et 1 pour un utilisateur externe
    },

    // Adresse du server SMTP
    smtp_address: {
        type: String,
       
    },

    // Port du serveur SMTP
    smtp_port: {
        type: String,
        
    },

    // Adresse du server POP3 ou Imap de l'utilisateur
    pop3_imap_address: {
        type: String,
       
    },

    // Port du server POP3 ou Imap de l'utilisateur
    pop3_imap_port: {
        type: String,
    },
})

// Exporter le module 
module.exports = mongoose.model("User", userSchema)