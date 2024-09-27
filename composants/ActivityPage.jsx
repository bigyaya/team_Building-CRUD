const ActivityPage = ({ activite }) => {
  if (!activite) {
    return <div>Activité introuvable</div>;
  }

  return (
    <div className="activity-page">
      {/* Header avec vérification de l'image */}
      <header className="relative w-full h-96 bg-cover bg-center" style={{ backgroundImage: activite.image ? `url(${activite.image})` : 'none' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-white text-4xl font-bold">{activite.title}</h1>
        </div>
      </header>

      {/* Section détails de l'activité */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-6">{activite.title}</h2>
          <p className="text-lg text-gray-700 mb-8">{activite.description}</p>
          <article className="text-gray-800 leading-relaxed">{activite.article}</article>
        </div>
      </section>
    </div>
  );
};

export default ActivityPage;
