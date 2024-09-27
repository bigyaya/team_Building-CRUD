// // composants/ActivitiesGrid.jsx
// import { useRouter } from 'next/router';
// import '../styles/activities.css'; // Importer les styles

// export default function ActivitiesGrid() {
//   const router = useRouter(); // Initialiser le router pour la navigation

//   const activities = [
//     {
//       id: '66f52e0f21ffbafbb6dbcd4a',
//       title: 'Escape Game',
//       description: 'Découvrez des énigmes en équipe et résolvez des mystères dans nos Escape Games.',
//       image: '/escape_game.jpg',
//     },
//     {
//       id: '66f52e0f21ffbafbb6dbcd4b',
//       title: 'Chasse au Trésor',
//       description: 'Partez à l’aventure et trouvez des indices pour découvrir le trésor caché.',
//       image: '/team-building-chasse-au-tresor.jpg',
//     },
//     {
//       id: '66f52e0f21ffbafbb6dbcd4c',
//       title: 'Course en Équipe',
//       description: 'Collaborez avec votre équipe pour surmonter des défis et atteindre la victoire.',
//       image: '/courseEnEquipe.jpg',
//     },
//   ];

//   const handleDiscoverClick = (id) => {
//     router.push(`/activity/${id}`); // Redirection vers la page d'activité
//   };

//   return (
//     <section className="activities">
//       <div className="activities-grid">
//         {activities.map((activity) => (
//           <div className="card" key={activity.id}>
//             <img src={activity.image} alt={activity.title} />
//             <h3>{activity.title}</h3>
//             <p>{activity.description}</p>
//             <button onClick={() => handleDiscoverClick(activity.id)}>Découvrir</button>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }


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
    <section className="activities">
      <div className="activities-grid">
        {activities.map((activity) => (
          <div className="card" key={activity._id}> {/* Utilisation de l'ObjectId de MongoDB */}
            <img src={activity.image} alt={activity.title} />
            <h3>{activity.title}</h3>
            <p>{activity.description}</p>
            <button onClick={() => handleDiscoverClick(activity._id)}>Découvrir</button> {/* Utilisation de l'ObjectId */}
          </div>
        ))}
      </div>
    </section>
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
