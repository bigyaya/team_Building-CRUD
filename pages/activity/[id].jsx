// // pages/activity/[id].jsx
// import dbConnect from '../../utils/dbConnect';
// import Activite from '../../modeles/Activite';
// // import ActivityPage from '../../components/ActivityPage';

// const ActivityPage = ({ activite }) => {
//   if (!activite) {
//     return <div>Activité introuvable</div>;
//   }

//   return (
//     <div className="activity-page">
//       <header className="hero" style={{ backgroundImage: `url(${activite.image})` }}>
//         <div className="overlay">
//           <h1>{activite.title}</h1>
//         </div>
//       </header>
//       <section className="activity-details">
//         <div className="container">
//           <h2>{activite.title}</h2>
//           <p>{activite.description}</p>
//           <article>{activite.article}</article>
//         </div>
//       </section>
//     </div>
//   );
// };

// // Rechercher l'activité par ObjectId dans MongoDB
// export async function getServerSideProps({ params }) {
//   await dbConnect();
  

//   const activite = await Activite.findById(params.id).lean();

//   if (!activite) {
//     return {
//       notFound: true,
//     };
//   }

//   return {
//     props: {
//       activite: JSON.parse(JSON.stringify(activite)),
//     },
//   };
// }

// export default ActivityPage;



// pages/activity/[id].jsx
import dbConnect from '../../utils/dbConnect';
import Activite from '../../modeles/Activite';
import '../../styles/activity.css'; // Import du fichier CSS

const ActivityPage = ({ activite }) => {
  if (!activite) {
    return <div>Activité introuvable</div>;
  }

  return (
    <div className="activity-page">
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




// import dbConnect from '../../utils/dbConnect';
// import Activite from '../../modeles/Activite';
// import ActivityPage from '../../composants/ActivityPage'; // Importer le composant

// const ActivityDetail = ({ activite }) => {
//   if (!activite) {
//     return <div>Activité introuvable</div>;
//   }

//   return <ActivityPage activite={activite} />;
// };

// // Rechercher l'activité par ObjectId dans MongoDB
// export async function getServerSideProps({ params }) {
//   await dbConnect();

//   try {
//     const activite = await Activite.findById(params.id).lean();

//     if (!activite) {
//       return {
//         notFound: true, // Renvoie une page 404 si l'activité n'est pas trouvée
//       };
//     }

//     return {
//       props: {
//         activite: JSON.parse(JSON.stringify(activite)), // Sérialisation nécessaire pour Next.js
//       },
//     };
//   } catch (error) {
//     console.error('Erreur lors de la récupération de l\'activité:', error);
//     return {
//       notFound: true,
//     };
//   }
// }

// export default ActivityDetail;
