// pages/activity/[id].jsx
import dbConnect from '../../utils/dbConnect';
import Activite from '../../modeles/Activite';

const ActivityPage = ({ activite }) => {
  if (!activite) {
    return <div>Activité introuvable</div>;
  }

  return (
    <div className="activity-page">
      <header className="hero" style={{ backgroundImage: `url(${activite.image})` }}>
        <div className="overlay">
          <h1>{activite.title}</h1>
        </div>
      </header>
      <section className="activity-details">
        <div className="container">
          <h2>{activite.title}</h2>
          <p>{activite.description}</p>
          <article>{activite.article}</article>
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

  return {
    props: {
      activite: JSON.parse(JSON.stringify(activite)),
    },
  };
}

export default ActivityPage;
