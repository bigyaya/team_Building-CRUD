import dbConnect from '../../../utils/dbConnect';
import Utilisateur from '../../../modeles/Utilisateur';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const comptes = await Utilisateur.find({}); // Récupérer tous les comptes
      res.status(200).json({ success: true, comptes });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Erreur lors de la récupération des comptes' });
    }
  } else {
    res.status(400).json({ success: false, message: 'Méthode non autorisée' });
  }
}
