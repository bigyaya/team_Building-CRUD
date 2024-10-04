// Importation des bibliothèques nécessaires pour Next.js et MongoDB
import '../../styles/list.css';
import { useRouter } from 'next/router';  // Utilisé pour la redirection
import dbConnect from '../../utils/dbConnect';  // Connexion à MongoDB
import Activite from '../../modeles/Activite';  // Modèle MongoDB pour les activités
import Header from '../../composants/Header';  // Composant Header pour la navigation en haut de page
import Footer from '../../composants/footer';  // Composant Footer pour le bas de page



const ListActivities = ({ activities }) => {
  const router = useRouter();  // Récupère l'objet `router` pour gérer les redirections

  // Fonction pour rediriger vers la page de détails d'une activité
  const handleViewActivity = (id) => {
    router.push(`/activity/${id}`);  // Redirige vers la page spécifique de l'activité en fonction de son ID
  };

  return (
    <>
      <Header />  {/* Affichage du header pour toutes les pages */}

      {/* Conteneur pour la liste des activités */}
      <div className="activities-container">
        <h1>Toutes les activités</h1>  {/* Titre principal de la page */}

        {/* Grille pour afficher toutes les activités sous forme de cartes */}
        <div className="activities-grid">
          {activities.map((activity) => (  // Parcours de la liste des activités
            <div key={activity._id} className="activity-card">
              <img src={activity.image || '/default-image.jpg'} alt={activity.title} className="activity-image" />  {/* Image de l'activité ou une image par défaut */}
              <h2>{activity.title}</h2>  {/* Titre de l'activité */}
              <p>{activity.description}</p>  {/* Description courte de l'activité */}
              
              {/* Bouton pour voir plus de détails sur une activité */}
              <button className="view-button" onClick={() => handleViewActivity(activity._id)}>
                Voir plus
              </button>
            </div>
          ))}
        </div>
      </div>

      <Footer />  {/* Affichage du footer en bas de page */}
    </>
  );
};

// Fonction Next.js pour récupérer les activités depuis MongoDB avant de rendre la page
export async function getServerSideProps() {
  await dbConnect();  // Connexion à MongoDB
  const activities = await Activite.find({}).lean();  // Récupération de toutes les activités

  return {
    props: {
      activities: JSON.parse(JSON.stringify(activities)),  // Sérialisation des activités pour les passer en props
    },
  };
}

export default ListActivities;  // Export du composant pour l'utiliser dans Next.js
