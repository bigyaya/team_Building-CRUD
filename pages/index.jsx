// pages/index.jsx
import Header from '../composants/Header';
import Hero from '../composants/Hero';
import ActivitiesGrid from '../composants/ActivitiesGrid';
import Footer from '../composants/footer';
import dbConnect from '../utils/dbConnect'; // Importer la connexion à la base de données
import Activite from '../modeles/Activite'; // Importer le modèle Activite
import SearchBar from '../composants/SearchBar'; // Importer le composant SearchBar
import { useRouter } from 'next/router';
// import '../styles/globals.css';


export default function Home({ activities }) {
  const router = useRouter();

  const handleProfileClick = () => {
    router.push('/profil'); // Redirection vers la page profil
  };

  return (
    <div>
      <Header />
      <SearchBar />
      <Hero />
      <ActivitiesGrid activities={activities} /> {/* Passer les activités en tant que props */}
      <Footer />
    </div>
  );
}

// Récupération des données depuis MongoDB
export async function getServerSideProps() {
  await dbConnect(); // Connexion à MongoDB

  try {
    const result = await Activite.find({}); // Récupérer toutes les activités
    const activities = result.map((doc) => {
      const activity = doc.toObject();
      activity._id = activity._id.toString(); // Convertir l'ObjectId en chaîne de caractères
      activity.dateCreation = activity.dateCreation ? activity.dateCreation.toISOString() : null; // Convertir Date en chaîne
      return activity;
    });

  //    // Sérialiser les dates en chaînes de caractères
  // const serializedActivities = activities.map((activity) => {
  //   return {
  //     ...activity,
  //     availableDates: activity.availableDates.map(date => date.toISOString()), // Conversion des dates
  //     dateCreation: activity.dateCreation ? activity.dateCreation.toISOString() : null // Sérialisation de la date de création
  //   };
  // });

  //  return {
  //   props: {
  //     activities: serializedActivities
  //   }
  // };

    console.log('Activités récupérées :', activities); // Ajoutez ceci pour voir si les activités sont récupérées

    return {
      props: { activities }, // Passer les activités en tant que props
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des activités :', error);
    return {
      props: {
        activities: [], // En cas d'erreur, renvoyer un tableau vide
      },
    };
  }
}



