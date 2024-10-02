// /pages/api/recherche.js

import dbConnect from '../../utils/dbConnect'; // Connexion à la base de données
import Activite from '../../modeles/Activite'; // Import du modèle Activite

export default async function handler(req, res) {
  // Connexion à la base de données
  await dbConnect();

  // Récupérer les paramètres de recherche depuis la requête
  const { location, theme, date } = req.query;

  // Construire le filtre de recherche basé sur les paramètres fournis
  let query = {};

  if (location) {
    query.location = { $regex: location, $options: 'i' }; // Recherche insensible à la casse
  }

  if (theme) {
    query.theme = { $regex: theme, $options: 'i' }; // Recherche insensible à la casse
  }

  if (date) {
    query.availableDates = { $gte: new Date(date) }; // Rechercher les activités disponibles à partir d'une date donnée
  }

  try {
    // Effectuer la recherche dans MongoDB
    const activites = await Activite.find(query);

    // Retourner les résultats sous forme de JSON
    res.status(200).json({ success: true, data: activites });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
