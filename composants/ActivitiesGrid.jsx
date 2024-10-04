// composants/ActivitiesGrid.jsx
import { useRouter } from 'next/router';
import '../styles/activities.css'; // Importer les styles

export default function ActivitiesGrid({ activities }) { // Les activités sont maintenant passées en props
  const router = useRouter();

  const handleDiscoverClick = (id) => {
    router.push(`/activity/${id}`); // Redirection vers la page d'activité avec ObjectId
  };

  // Vérification si `activities` est défini et contient des éléments
  if (!activities || activities.length === 0) {
    return <div>Aucune activité disponible</div>; // Afficher un message si les activités sont vides ou non définies
  }

  return (
    <div className="activities-section">

      {/* Titre et sous-titre pour les activités */}
      <div className="activities-header">
        <h2>Les meilleurs Team Building de Paris et Ile-de-France sont sur TeamBuild</h2> {/* Titre de la section */}
        <p>Vous recherchez une activité pour votre team building à Paris ou en Ile-de-France ? Spotlag met à votre disposition un large choix d’animations originales qui pourront accueillir vos collaborateurs. </p> {/* Sous-titre */}
      </div>

      {/* Grille des activités */}
      <div className="activities-grid">
        {activities.map((activity) => (
          <div key={activity._id} className="card">
            <img src={activity.image} alt={activity.title} />
            <h3>{activity.title}</h3>
            <p>{activity.description}</p>
            <div className="info">
              <div>
                <span className="icon">👥</span> Jusquà {activity.maxParticipants} pers.
              </div>
              <span href="#" className="location">{activity.location}</span>
            </div>
              <a href={`/activity/${activity._id}`} className="button primary">
            <button>
                Voir plus
            </button>
              </a>
          </div>
        ))}
      </div>
    </div>
  );
}

// Récupération des données depuis MongoDB
export async function getServerSideProps() {
  await dbConnect(); // Connexion à la base de données

  const result = await Activite.find({}); // Récupérer toutes les activités depuis MongoDB
  const activities = result.map((doc) => {
    const activity = doc.toObject();
    activity._id = activity._id.toString(); // Convertir l'ObjectId en chaîne de caractères
    return activity;
  });

  return {
    props: { activities }, // Passer les activités en tant que props
  };
}
