// Importation des bibliothèques et composants nécessaires
import { useRouter } from 'next/router'; // Pour accéder aux paramètres d'URL
import { useState, useEffect } from 'react'; // Pour gérer les états et les effets
import Header from '../../composants/Header'; // Importer le header pour l'inclure dans la page
import Footer from '../../composants/footer'; // Importer le footer pour l'inclure dans la page
import dbConnect from '../../utils/dbConnect'; // Connexion à la base de données
import Activite from '../../modeles/Activite'; // Modèle des activités MongoDB

const SearchResults = ({ results }) => {
  // Utiliser le hook router pour obtenir les paramètres de la requête
  const router = useRouter();

  // Si aucun résultat trouvé, afficher un message approprié
  if (!results.length) {
    return (
      <div>
        <Header />
        <div className="container">
          <h2>0 résultat trouvé pour votre recherche</h2>
          <button onClick={() => router.push('/activity/list')}>Retour à la liste des activités</button>
        </div>
        <Footer />
      </div>
    );
  }

  // Affichage des résultats si des activités correspondent à la recherche
  return (
    <div>
      <Header />
      <div className="container">
        <h2>Résultats de la recherche</h2>
        <div className="results-grid">
          {results.map((activity) => (
            <div key={activity._id} className="card">
              <h3>{activity.title}</h3>
              <p>{activity.description}</p>
              <p>Lieu: {activity.location}</p>
              <p>Capacité maximale: {activity.maxParticipants} personnes</p>
              <button onClick={() => router.push(`/activity/${activity._id}`)}>Voir plus</button>
            </div>
          ))}
        </div>
        <button onClick={() => router.push('/activity/list')}>Retour à la liste des activités</button>
      </div>
      <Footer />
    </div>
  );
};

// Fonction pour récupérer les données du serveur à chaque requête
export async function getServerSideProps({ query }) {
  // Connexion à la base de données
  await dbConnect();

  // Extraction des paramètres de recherche depuis l'URL
  const { location, theme, participants, date } = query;

  // Requête dynamique selon les critères de recherche
  let searchQuery = {};

  // Si un lieu a été renseigné, on l'ajoute à la requête
  if (location) {
    searchQuery.location = { $regex: location, $options: 'i' };
  }

  // Si un thème a été renseigné
  if (theme) {
    searchQuery.theme = { $regex: theme, $options: 'i' };
  }

  // Si un nombre de participants a été renseigné
  if (participants) {
    searchQuery.maxParticipants = { $gte: participants };
  }

  // Si une date a été renseignée, vérifier la disponibilité
  if (date) {
    searchQuery.availableDates = { $in: [new Date(date)] };
  }

  // Exécution de la requête avec les filtres
  const activities = await Activite.find(searchQuery);

  // Conversion des objets MongoDB en objets JSON
  const results = activities.map((doc) => {
    const activity = doc.toObject();
    activity._id = activity._id.toString();
    return activity;
  });

  // Retourner les résultats sous forme de props
  return { props: { results } };
}

export default SearchResults;
