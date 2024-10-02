// pages/activity/[id].jsx
import dbConnect from '../../utils/dbConnect';
import Activite from '../../modeles/Activite';
import '../../styles/activity.css'; // Import du fichier CSS
import Header from "../../composants/Header"
import Footer from "../../composants/footer"

const ActivityPage = ({ activite }) => {
  if (!activite) {
    return <div>Activité introuvable</div>;
  }

  return (
    <div className="activity-page">
      < Header />
      {/* Section Hero avec image de fond */}
      <header className="hero" style={{ backgroundImage: `url(${activite.image})` }}>
        <div className="overlay">
          <h1 className="hero-title">{activite.title}</h1>
        </div>
      </header>

      {/* Section des détails de l'activité */}
      <section className="activity-details">
        <div className="container">
          <h2 className="activity-title">{activite.title}</h2>
          <p className="activity-description">{activite.description}</p>
          <article className="activity-article">{activite.article}</article>

          {/* Boutons d'action */}
          <div className="buttons">
            <button className="button primary">Réserver cette activité</button>
            <button className="button secondary">Retour à la liste</button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

// Rechercher l'activité par ObjectId dans MongoDB
export async function getServerSideProps({ params }) {
  await dbConnect();
  const activite = await Activite.findById(params.id).lean();

  if (!activite) {
    return {
      notFound: true,
    };
  }

  // Convertir les champs ObjectId en chaînes de caractères
  activite._id = activite._id.toString();

  // Convertir l'_id et la date en chaînes de caractères
  activite._id = activite._id.toString();

  if (activite.dateCreation) {
    activite.dateCreation = activite.dateCreation.toISOString(); // Convertir la date en chaîne de caractères
  }

  return {
    props: {
      activite,
    },
  };
}


export default ActivityPage;


