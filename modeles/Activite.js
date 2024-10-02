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
        required: true,
        unique: true // Le slug doit être unique
    },
    location: {
        type: String, // Lieu de l'activité
        required: true
    },
    theme: {
        type: String, // Thème de l'activité
        required: true
    },
    availableDates: [
        {
            type: Date, // Dates disponibles pour l'activité
            required: true
        }
    ],
    maxParticipants: {
        type: Number, // Nombre maximum de participants
        required: true
    }
});

// Exportation du modèle Activite
module.exports = mongoose.models.Activite || mongoose.model('Activite', ActiviteSchema, 'activites');
