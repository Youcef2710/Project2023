// Démarrer express
const express = require("express");
var bodyParser = require("body-parser");
// Accepter les variables d'environnement
const env = require("dotenv").config();

const jwt = require("jsonwebtoken");

// Importer les routes
const UserRouter = require("./routes/User");
const EmailRouter = require("./routes/Email");
const GuestRouter = require("./routes/Guest");
const MessageRouter = require("./routes/Message");

// Créer une application express
app = express();
 
// Cross origin policy
const cors = require("cors");
app.use(cors());

var jsonParser = bodyParser.json();
app.use(express.json());

const mongoose = require("mongoose");

function auth(req, res, next) {
  // Récupérer l'entete d'Authorization
  const authHeader = req.headers["authorization"];
  // Récupérer le token d'authentification
  const authToken = authHeader && authHeader.split(" ")[1];
  // Si le token n'a pas été envoyé par l'appel API on retourne 401
  if (authToken == null) return res.sendStatus(401);
  // Comparer le token d'authentification au token suvegardé dans AUTH_TOKEN
  jwt.verify(authToken, process.env.AUTH_TOKEN, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

const db = (module.exports = () => {
  try {
    // Connexion à MongoDB en utilisant Mongoose et la variable d'environnemennt DB_URI
    // Voir le fichier .env dans la racine du dossier "server"
    const uri = process.env.DB_URI;

    mongoose.connect(uri);
    console.log("Connexion établie avec success");
    // Route vers la gestion des utilisateurs
    app.use("/users", jsonParser, UserRouter);
    // Route pour la gestion des Emails
    app.use("/emails", jsonParser, EmailRouter);
    // Roure vers le 
    app.use("/guest", jsonParser, GuestRouter);
    // Route vers la gestion de messagerie instantanée
    app.use("/messages", jsonParser, MessageRouter);

  } catch (error) {
    console.log(error);
  }
});

// Se connecter à la base de donnée ATLAS
db();

// Numéro de port su server
/* A récupérer dans le fichier .env de la racine du dossier "server" */
const port_number = process.env.PORT_NUMBER;
app.listen(port_number, () => {
  console.log(`Le server est démarré au port : ${port_number} `);
}); 

 
