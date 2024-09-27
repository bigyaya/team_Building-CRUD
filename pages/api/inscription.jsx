// // /pages/api/inscription.js

// import dbConnect from '../../utils/dbConnect';
// import Utilisateur from '../../modeles/Utilisateur';
// import bcrypt from 'bcrypt';

// dbConnect();

// const inscription = async (req, res) => {
//     const { email, motDePasse } = req.body;

//     try {
//         const motDePasseHashe = await bcrypt.hash(motDePasse, 10);
//         const utilisateur = new Utilisateur({ email, motDePasse: motDePasseHashe });
//         await utilisateur.save();
//         res.status(201).json({ success: true, utilisateur });
//     } catch (error) {
//         res.status(400).json({ success: false, error });
//     }
// };

// export default inscription;


import dbConnect from '../../utils/dbConnect';
import Utilisateur from '../../modeles/Utilisateur';
import bcrypt from 'bcrypt';

dbConnect();

const inscription = async (req, res) => {
    const { email, motDePasse } = req.body;

    try {
        console.log("Début de l'inscription"); // Débogage
        console.log("Email:", email); // Débogage
        console.log("Mot de passe:", motDePasse); // Débogage

        const motDePasseHashe = await bcrypt.hash(motDePasse, 10);
        const utilisateur = new Utilisateur({ email, motDePasse: motDePasseHashe });
        await utilisateur.save();
        console.log("Utilisateur enregistré:", utilisateur); // Débogage

        res.status(201).json({ success: true, utilisateur });
    } catch (error) {
        console.error("Erreur lors de l'inscription:", error); // Débogage
        res.status(400).json({ success: false, error });
    }
};

export default inscription;
