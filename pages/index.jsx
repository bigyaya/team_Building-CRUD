// pages/index.jsx
import Header from '../composants/Header';
import Hero from '../composants/Hero';
import ActivitiesGrid from '../composants/ActivitiesGrid';
import Footer from '../composants/footer';

export default function Home() {
  return (
    <div>
      {/* Inclure l'en-tête (Header) */}
      <Header />
      <Hero />
      <ActivitiesGrid />
      <Footer />

      {/* Contenu de la page d'accueil */}
      {/* <main className="container mx-auto px-6 py-12">
      </main> */}
        {/* <h1 className="text-5xl font-bold mb-6">Bienvenue sur notre site de Team Building</h1>
        <p className="text-lg text-gray-700 mb-4">
          Des jeux, escape games et expériences pour collaborer tout en samusant.
        </p> */}
        {/* Autres sections du site ici */}
    </div>
  );
}

