import dbConnect from '../../../utils/dbConnect'; // Importer la fonction de connexion à MongoDB
import Utilisateur from '../../../modeles/Utilisateur'; // Importer le modèle Utilisateur

export default async function handler(req, res) {
  await dbConnect(); // Se connecter à MongoDB

  if (req.method === 'POST') { // Vérifier que la méthode HTTP est POST
    try {
      const { nom, email, age, adresse } = req.body; // Récupérer les données envoyées dans le body

      // Trouver l'utilisateur par email et mettre à jour ses informations
      const utilisateur = await Utilisateur.findOneAndUpdate(
        { email },
        { nom, age, adresse },
        { new: true } // Retourner le document mis à jour
      );

      if (!utilisateur) {
        return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
      }

      res.status(200).json({ success: true, data: utilisateur });
    } catch (error) {
      res.status(400).json({ success: false, message: 'Erreur lors de la mise à jour du profil' });
    }
  } else {
    res.status(400).json({ success: false, message: 'Méthode non autorisée' });
  }
}
