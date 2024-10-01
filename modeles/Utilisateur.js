// /modeles/Utilisateur.js

const mongoose = require('mongoose'); // Importation de Mongoose

// Définition du schéma utilisateur pour MongoDB
const UtilisateurSchema = new mongoose.Schema({
    email: {
        type: String, // Le type de données est une chaîne de caractères
        required: true, // Champ obligatoire
        unique: true // L'email doit être unique
    },
    motDePasse: {
        type: String, // Le type de données est une chaîne de caractères
        required: true // Champ obligatoire
    },
    nom: {
        type: String, // Le type de données est une chaîne de caractères
        required: false // Champ optionnel
    },
    age: {
        type: Number, // Le type de données est un nombre
        required: false // Champ optionnel
    },
    adresse: {
        type: String, // Le type de données est une chaîne de caractères
        required: false // Champ optionnel
    }
});

// Exportation du modèle Utilisateur
module.exports = mongoose.models.Utilisateur || mongoose.model('Utilisateur', UtilisateurSchema, 'users');
