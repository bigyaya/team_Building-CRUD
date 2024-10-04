import { useRouter } from 'next/router';  // Importation pour la gestion de la redirection
import Header from '../../composants/Header';  // Importation du header
import Footer from '../../composants/footer';  // Importation du footer
// import Activite from '../../modeles/Activite';

import { useState } from 'react';  // Importation du hook `useState` pour gérer l'état du formulaire
import '../../styles/devis.css';


const DevisForm = () => {
  const router = useRouter();
  const { id } = router.query;  // Récupération de l'ID de l'activité depuis l'URL

  // Gestion des états pour les champs du formulaire
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    message: '',
  });

  // Fonction de gestion des changements dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,  // On garde les autres champs inchangés
      [name]: value,  // On met à jour le champ modifié
    });
  };

  // Fonction pour soumettre le formulaire de devis
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Devis soumis:', formData);

    // Ici, tu peux ajouter une requête API pour envoyer les informations au serveur ou à l'admin

    alert('Votre devis a été envoyé !');
    router.push('/activity/list');  // Redirige vers la liste des activités après l'envoi
  };

  

  return (
    <>
      <Header />
      <div className="devis-container">
        <h1>Demander un devis </h1>  {/* Titre du formulaire avec l'ID de l'activité */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nom">Nom complet</label>
            <input
              type="text"
              id="nom"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Votre message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button type="submit" className="submit-button">Envoyer le devis</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default DevisForm;
