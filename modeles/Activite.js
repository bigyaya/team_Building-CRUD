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
module.exports = mongoose.models.Activite || mongoose.model('Activite', ActiviteSchema, 'activites');


// const mongoose = require('mongoose');

// // Définition du schéma pour les activités de team building
// const ActiviteSchema = new mongoose.Schema({
//     title: {
//         type: String, // Le nom de l'activité
//         required: true // Champ obligatoire
//     },
//     description: {
//         type: String, // La description de l'activité
//         required: true // Champ obligatoire
//     },
//     article: {
//         type: String, // Détails supplémentaires sur l'activité
//         required: true // Champ obligatoire
//     },
//     image: {
//         type: String, // Chemin ou URL de l'image
//         required: true // Champ obligatoire
//     },
//     slug: {
//         type: String, // URL unique pour l'activité
//         required: true,
//         unique: true // Le slug doit être unique
//     },
//     // Champs pour les informations de base sur l'activité
//     location: {
//         type: String, // Lieu de l'activité
//         required: true // Peut être facultatif selon le cas
//     },
//     duration: {
//         type: Number, // Durée en minutes ou heures
//         required: true // Peut être facultatif selon les besoins
//     },
//     theme: {
//         type: String, // Thème de l'activité (ex : aventure, sport)
//         required: true // Peut être facultatif
//     },
//     maxParticipants: {
//         type: Number, // Nombre maximum de participants
//         required: true // Facultatif selon les activités
//     },
//     dateCreation: {
//         type: Date, // La date de création de l'activité
//         default: Date.now // Valeur par défaut
//     },
//     availableDates: [
//         {
//             type: Date, // Dates disponibles pour l'activité
//             required: true // Peut être facultatif
//         }
//     ],
//     // Enregistrements des choix personnalisés par l'utilisateur connecté
//     userChoices: [{
//         userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//         chosenTheme: { type: String }, // Thème choisis par l'utilisateur
//         chosenLocation: { type: String }, // Lieu choisi par l'utilisateur
//         chosenDate: { type: Date }, // Date choisie
//         participants: { type: Number }, // Nombre de participants choisis
//         additionalRequests: { type: String } // Autres demandes ou options personnalisées
//     }]
// });

// Exportation du modèle Activite
module.exports = mongoose.models.Activite || mongoose.model('Activite', ActiviteSchema, 'activites');
