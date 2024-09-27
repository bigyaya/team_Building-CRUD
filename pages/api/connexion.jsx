// /pages/api/connexion.js

import dbConnect from '../../utils/dbConnect';
import Utilisateur from '../../modeles/Utilisateur';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

dbConnect();

const connexion = async (req, res) => {
    const { email, motDePasse } = req.body;

    try {
        const utilisateur = await Utilisateur.findOne({ email });
        if (!utilisateur) {
            return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
        }

        const isMatch = await bcrypt.compare(motDePasse, utilisateur.motDePasse);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Identifiants invalides' });
        }

        const token = jwt.sign({ utilisateurId: utilisateur._id }, 'votre_secret_jwt', { expiresIn: '1h' });

        res.status(200).json({ success: true, token });
    } catch (error) {
        res.status(400).json({ success: false, error });
    }
};

export default connexion;
