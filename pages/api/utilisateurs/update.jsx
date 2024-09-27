// pages/api/utilisateurs/update.js
import dbConnect from '../../../utils/dbConnect';
import Utilisateur from '../../../modeles/Utilisateur';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'PUT') {
    console.log("Données reçues :", req.body);
    try {
      const { email, newEmail, newPassword } = req.body;

      // Vérification que l'email actuel est fourni
      if (!email) {
        return res.status(400).json({ success: false, message: 'Email manquant' });
      }

      // Trouver l'utilisateur par email actuel
      const utilisateur = await Utilisateur.findOne({ email });

      if (!utilisateur) {
        return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
      }

      // Mise à jour de l'email si un nouvel email est fourni
      if (newEmail) utilisateur.email = newEmail;

      // Mise à jour du mot de passe si un nouveau mot de passe est fourni
      if (newPassword) {
        utilisateur.password = await bcrypt.hash(newPassword, 10);
      }

      // Enregistrer les modifications
      await utilisateur.save();

      res.status(200).json({ success: true, data: utilisateur });
    } catch (error) {
      res.status(400).json({ success: false, message: 'Erreur lors de la mise à jour' });
    }
  } else {
    res.status(400).json({ success: false, message: 'Méthode non autorisée' });
  }
}

