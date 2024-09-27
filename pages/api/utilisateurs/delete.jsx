// pages/api/utilisateurs/delete.js
import dbConnect from '../../../utils/dbConnect';
import Utilisateur from '../../../modeles/Utilisateur';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'DELETE') {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ success: false, message: 'Email manquant' });
      }

      // Trouver et supprimer l'utilisateur par email
      const utilisateur = await Utilisateur.findOneAndDelete({ email });

      if (!utilisateur) {
        return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
      }

      res.status(200).json({ success: true, message: 'Utilisateur supprimé' });
    } catch (error) {
      res.status(400).json({ success: false, message: 'Erreur lors de la suppression' });
    }
  } else {
    res.status(400).json({ success: false, message: 'Méthode non autorisée' });
  }
}
