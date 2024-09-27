// composants/ActivitiesGrid.jsx
import '../styles/activities.css'; // Importer les styles

export default function ActivitiesGrid() {
  const activities = [
    {
      id: 1,
      title: 'Escape Game',
      description: 'Découvrez des énigmes en équipe et résolvez des mystères dans nos Escape Games.',
      image: '/escape_game.jpg',
    },
    {
      id: 2,
      title: 'Chasse au Trésor',
      description: 'Partez à l’aventure et trouvez des indices pour découvrir le trésor caché.',
      image: '/team-building-chasse-au-tresor.jpg',
    },
    {
      id: 3,
      title: 'Course en Équipe',
      description: 'Collaborez avec votre équipe pour surmonter des défis et atteindre la victoire.',
      image: '/courseEnEquipe.jpg',
    },
  ];

  return (
    <section className="activities">
      <h2 className="text-3xl font-bold text-center mb-8">Nos Activités</h2>
      <div className="activities-grid">
        {activities.map(activity => (
          <div className="card" key={activity.id}>
            <img src={activity.image} alt={activity.title} />
            <h3>{activity.title}</h3>
            <p>{activity.description}</p>
            <button>Découvrir</button>
          </div>
        ))}
      </div>
    </section>
  );
}
