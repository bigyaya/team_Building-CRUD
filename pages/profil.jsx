import { useState } from 'react'; // Importer useState pour gérer les entrées de l'utilisateur
import { useRouter } from 'next/router'; // Importer useRouter pour rediriger après la mise à jour
import '../styles/profil.css'

export default function ProfilPage() {
  const [nom, setNom] = useState(''); // État pour le nom
  const [email, setEmail] = useState(''); // État pour l'email
  const [age, setAge] = useState(''); // État pour l'âge
  const [adresse, setAdresse] = useState(''); // État pour l'adresse

  const router = useRouter(); // Utiliser useRouter pour rediriger

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêcher le comportement par défaut de rechargement de la page

    // Envoyer les données du formulaire à l'API
    try {
      const res = await fetch('/api/utilisateurs/updateProfile', {
        method: 'POST', // Méthode POST pour l'envoi des données
        headers: {
          'Content-Type': 'application/json', // Les données envoyées sont en JSON
        },
        body: JSON.stringify({
          nom,
          email,
          age,
          adresse,
        }), // Envoyer les informations de profil dans le body de la requête
      });

      const data = await res.json(); // Récupérer la réponse en JSON
      if (data.success) {
        alert('Profil mis à jour avec succès'); // Afficher un message de succès
        router.push('/'); // Rediriger vers la page d'accueil après la mise à jour
      } else {
        alert('Erreur lors de la mise à jour du profil');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
    }
  };

  return (
    <div className="profil-container"> {/* Conteneur principal */}
      <h1>Mon Profil</h1>
      <form onSubmit={handleSubmit}> {/* Formulaire pour la mise à jour du profil */}
        <div className="input-group">
          <label htmlFor="nom">Nom :</label>
          <input
            type="text"
            id="nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)} // Mettre à jour l'état du nom
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Mettre à jour l'état de l'email
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="age">Âge :</label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)} // Mettre à jour l'état de l'âge
          />
        </div>

        <div className="input-group">
          <label htmlFor="adresse">Adresse :</label>
          <input
            type="text"
            id="adresse"
            value={adresse}
            onChange={(e) => setAdresse(e.target.value)} // Mettre à jour l'état de l'adresse
          />
        </div>

        <button type="submit" className="btn-submit">Mettre à jour le profil</button> {/* Bouton de soumission */}
      </form>
    </div>
  );
}
