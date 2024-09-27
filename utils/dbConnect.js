// // /utils/dbConnect.js

// import mongoose from 'mongoose'; // Importation de Mongoose

// const connection = {}; // Objet pour stocker l'état de la connexion

// // Fonction pour se connecter à MongoDB
// async function dbConnect() {
//     if (connection.isConnected) {
//         return; // Si déjà connecté, ne rien faire
//     }

//     console.log('MONGODB_URI:', process.env.MONGODB_URI); // Vérifiez que la variable est bien définie

//     // Connexion à MongoDB
//     const db = await mongoose.connect(process.env.MONGODB_URI, {
//         useNewUrlParser: true, // Utilisation du nouvel analyseur d'URL
//         useUnifiedTopology: true, // Utilisation du nouveau moteur de gestion des topologies
//         useCreateIndex: true, // Utilisation de createIndex() au lieu de ensureIndex()
//     });

//     // Mise à jour de l'état de la connexion
//     connection.isConnected = db.connections[0].readyState;
// }

// export default dbConnect; // Exportation de la fonction de connexion

import mongoose from 'mongoose';

const connection = {};

async function dbConnect() {
    if (connection.isConnected) {
        return;
    }

    console.log('MONGODB_URI:', process.env.MONGODB_URI); // Vérifiez que la variable est bien définie

    const db = await mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 5000, // Augmentez le délai d'attente si nécessaire
    });

    connection.isConnected = db.connections[0].readyState;
    console.log('Connexion à MongoDB réussie:', connection.isConnected); // Débogage
}

export default dbConnect;

