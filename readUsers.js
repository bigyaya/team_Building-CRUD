const mongoose = require('mongoose');

const uri = 'mongodb+srv://yaya:010203azQSwx@cluster1.jcp9nps.mongodb.net/teambuilding_db?retryWrites=true&w=majority&appName=Cluster1';

const UtilisateurSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    motDePasse: {
        type: String,
        required: true
    }
});

const Utilisateur = mongoose.model('Utilisateur', UtilisateurSchema);

mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 })
    .then(async () => {
        console.log('Connexion réussie à MongoDB');
        const utilisateurs = await Utilisateur.find({});
        console.log('Utilisateurs:', utilisateurs);
        mongoose.connection.close();
    })
    .catch(err => {
        console.error('Erreur de connexion à MongoDB', err);
    });
