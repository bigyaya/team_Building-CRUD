// pages/index.jsx
import Header from '../composants/Header';
import Hero from '../composants/Hero';
import ActivitiesGrid from '../composants/ActivitiesGrid';
import Footer from '../composants/footer';
import dbConnect from '../utils/dbConnect'; // Importer la connexion à la base de données
import Activite from '../modeles/Activite'; // Importer le modèle Activite

export default function Home({ activities }) {
  return (
    <div>
      <Header />
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

