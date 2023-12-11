const mongoose = require("mongoose");
const User = require("../models/User");




const CreateUser = async (req, res) => {
  try {
        const usr = new User(req.body);
        usr.save();
        res.status(200).json(usr);
  
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};


// Mise à jour de l'utilisateur
const UpdateUser = async (req, res) => {
  try {
    const filter = { _id: new mongoose.Types.ObjectId(req.params.id) };
    await User.findOneAndUpdate(filter, req.body);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

// Supprimer un utilisateur
// const DeleteUser = async (req, res) => {
//   try {
//     const filter = { _id: new mongoose.Types.ObjectId(req.params.id) };
//     await User.findOneAndRemove(filter);
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json({ message: error.message });
//   }
// };

const DeleteUser = async (req, res) => {
  try {
    const filter = { _id: new mongoose.Types.ObjectId(req.params.id) };

    // Utiliser findOneAndDelete au lieu de findOneAndRemove
    const result = await User.findOneAndDelete(filter);

    // Vérifier si un utilisateur a été supprimé
    if (result) {
      res.json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

// Récupérer tous les utilisateurs
const GetAll = async (req, res) => {
  try {
    let result = await User.find();
    res.send(result);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

// Récupérer un seul utilisateur
const GetOne = async (req, res) => {
  try {
    let filter = { _id: new mongoose.Types.ObjectId(req.params.id) };
    console.log(req.params.id);
    let result = await User.findOne({
      filter
    });
    res.send(result);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

// Exporter le module pour etre visible dans le même dossier
module.exports = {CreateUser, UpdateUser, GetAll, GetOne, DeleteUser };
