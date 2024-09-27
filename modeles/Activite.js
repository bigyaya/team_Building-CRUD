// /modeles/Activite.js

const mongoose = require('mongoose');

// Définition du schéma pour les activités de team building
const ActiviteSchema = new mongoose.Schema({
    title: {
        type: String, // Le nom de l'activité
        required: true // Champ obligatoire
    },
    description: {
        type: String, // La description de l'activité
        required: true // Champ obligatoire
    },
    article: {
        type: String, // Détails supplémentaires sur l'activité
        required: true // Champ obligatoire
    },
    image: {
        type: String, // Chemin ou URL de l'image
        required: true // Champ obligatoire
    },
    slug: {
        type: String, // URL unique pour l'activité
        required: true, // Champ obligatoire
        unique: true // Le slug doit être unique
    },
    dateCreation: {
        type: Date, // La date de création de l'activité
        default: Date.now // La valeur par défaut est la date et l'heure actuelles
    }
});

// Exportation du modèle Activite
module.exports = mongoose.models.Activite || mongoose.model('Activite', ActiviteSchema, 'activities');


