// /modeles/Activite.js

const mongoose = require('mongoose');

// Définition du schéma pour les activités de team building
const ActiviteSchema = new mongoose.Schema({
    nom: {
        type: String, // Le type de données est une chaîne de caractères
        required: true // Champ obligatoire
    },
    description: {
        type: String, // Le type de données est une chaîne de caractères
        required: false // Champ facultatif
    },
    dateCreation: {
        type: Date, // Le type de données est une date
        default: Date.now // La valeur par défaut est la date et l'heure actuelles
    }
});

// Exportation du modèle Activite
module.exports = mongoose.models.Activite || mongoose.model('Activite', ActiviteSchema);
