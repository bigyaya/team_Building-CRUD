const mongoose = require('mongoose');

const uri = 'mongodb+srv://yaya:010203azQSwx@cluster1.jcp9nps.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1';

mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 }) // Augmentez le délai d'attente si nécessaire
    .then(() => {
        console.log('Connexion réussie à MongoDB');
        mongoose.connection.close();
    })
    .catch(err => {
        console.error('Erreur de connexion à MongoDB', err);
    });
