// Récupérer le modèle
const User = require("../models/User");
// Permet de chiffrer le mot de passe avant l'enrgistrement dans la base de données
const bcrypt = require("bcrypt");

/* Inscription à l'application */
const Register = async (req, res) => {
  try {
    const saltOrRounds = 10; // Nombre de round de salt (Hashage plus sure)
    bcrypt.hash(req.body.password, saltOrRounds, function(err, hash) {
        req.body.password = hash
        const usr = new User(req.body);
        usr.save();
        res.status(200).json(usr);
    });
  
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

/* Se connecter à la base de donnée en utilisant l'email, le mot de passe 
et Json Web Token */
const Login = async (email, password) => {
  try {
    const user = await User.findOne({ email }).lean();
    if (!user) {
      return { status: "error", error: "L'utilisateur n'existe pas" };
    }
    if (await bcrypt.compare(password, user.password)) {
      // Créer un Json Web Token 
      token = jwt.sign(
        { id: user._id, username: user.email, type: "user" },
        // récupérer le token d'authentification dans le fichier env
        process.env.AUTH_TOKEN, 
        {}
      );
      // Retourner le Token au client
      return { status: "ok", data: token };
    }
    return { status: "error", error: "Mot de passe incorrect" };
  } catch (error) {
    console.log(error);
    return { status: "error", error: "L'Api est hors ligne" };
  }
};

module.exports = { Register, Login };
