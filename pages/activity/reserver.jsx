// pages/activity/reserver.jsx

import { useRouter } from 'next/router';
import Header from '../../composants/Header';
import Footer from '../../composants/footer';
import '../../styles/reserver.css'

const ReserverActivite = () => {
  const router = useRouter();
  const { id } = router.query; // Récupérer l'ID de l'activité

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    // Traiter la réservation ici
    console.log('Réservation soumise');
  };

  // Fonction pour retourner à la liste des activités
  const handleBackToList = () => {
    router.push('/activities'); // Redirige vers la liste des activités
  };

  return (
    <>
      <Header />
      <div className="reservation-container">
        <h1>Réserver lactivité</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nom complet</label>
            <input type="text" id="name" name="name" required />
          </div>

          <div className="form-group">
            <label htmlFor="participants">Nombre de participants</label>
            <input type="number" id="participants" name="participants" required />
          </div>

          <div className="form-group">
            <label htmlFor="date">Date de lactivité</label>
            <input type="date" id="date" name="date" required />
          </div>

          <div className="form-group">
            <button type="submit" className="reserve-button">Réserver cette activité</button>
            <button type="button" className="back-button" onClick={handleBackToList}>Retour à la liste</button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default ReserverActivite;
