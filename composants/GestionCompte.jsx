import { useState, useEffect } from 'react'; // Import des hooks React pour gérer l'état et les effets
import { useRouter } from 'next/router'; // Importer useRouter pour la navigation
import '../styles/GestionCompte.css'

export default function GestionCompte() {
  const [comptes, setComptes] = useState([]); // État pour stocker les comptes
  const [popupVisible, setPopupVisible] = useState(false); // État pour gérer la visibilité de la popup
  const [isLoggedIn, setIsLoggedIn] = useState(false); // État pour savoir si l'utilisateur est connecté
  const router = useRouter(); // Hook pour rediriger l'utilisateur

  // Utiliser useEffect pour vérifier si l'utilisateur est connecté
  useEffect(() => {
    const token = localStorage.getItem('token'); // Vérifier s'il y a un token dans le localStorage
    if (token) {
      setIsLoggedIn(true); // Si un token existe, l'utilisateur est connecté
    }
  }, []); // Exécuter ce hook seulement au montage

  // Récupérer les comptes au montage du composant (si l'utilisateur est connecté)
  useEffect(() => {
    if (isLoggedIn) { // Ne récupérer les comptes que si l'utilisateur est connecté
      const fetchComptes = async () => {
        try {
          const res = await fetch('/api/utilisateurs/comptes'); // Appel à l'API pour récupérer les comptes
          const data = await res.json(); // Conversion de la réponse en JSON
          setComptes(data.comptes); // Mise à jour de l'état avec les comptes
        } catch (error) {
          console.error('Erreur lors de la récupération des comptes:', error); // Afficher une erreur en cas de problème
        }
      };
      fetchComptes(); // Appel de la fonction pour récupérer les comptes
    }
  }, [isLoggedIn]); // Exécuter seulement si isLoggedIn est vrai

  // Basculer la visibilité de la popup
  const togglePopup = () => {
    setPopupVisible(!popupVisible); // Inverser l'état de la popup (affiché ou non)
  };

  // Gérer la déconnexion
  const handleLogout = () => {
    localStorage.removeItem('token'); // Supprimer le token local
    router.push('/connexion'); // Rediriger vers la page de connexion
  };

  // Rediriger vers la mise à jour de profil avec l'email comme paramètre
  const handleUpdateProfile = (email) => {
    router.push(`/profil?email=${email}`); // Rediriger avec l'email du profil sélectionné
  };

  // Supprimer un compte utilisateur
  const handleDeleteProfile = async (email) => {
    const confirmation = confirm(`Êtes-vous sûr de vouloir supprimer le compte ${email} ?`); // Confirmation avant suppression
    if (confirmation) {
      try {
        const res = await fetch('/api/utilisateurs/delete', {
          method: 'DELETE', // Méthode DELETE pour supprimer le compte
          headers: {
            'Content-Type': 'application/json', // Spécifier que les données sont en JSON
          },
          body: JSON.stringify({ email }), // Envoyer l'email du compte à supprimer
        });
        const data = await res.json(); // Parse la réponse en JSON
        if (data.success) {
          alert(`Compte ${email} supprimé avec succès`); // Afficher un message de succès
          setComptes(comptes.filter((compte) => compte.email !== email)); // Mise à jour de l'état en supprimant le compte localement
        } else {
          alert('Erreur lors de la suppression du compte'); // Afficher un message d'erreur si la suppression échoue
        }
      } catch (error) {
        console.error('Erreur lors de la suppression du compte:', error); // Afficher l'erreur dans la console
      }
    }
  };

  // Si l'utilisateur n'est pas connecté, ne pas afficher le bouton
  if (!isLoggedIn) {
    return null; // Retourner null pour ne rien afficher
  }

  return (
    <div className="compte-container"> {/* Conteneur pour la gestion des comptes */}
      {/* Bouton pour ouvrir la fenêtre popup */}
      <button onClick={togglePopup} className="compte-button">
        Gérer mes comptes
      </button>

      {/* Afficher la fenêtre popup si visible */}
      {popupVisible && (
        <div className="popup-overlay" onClick={() => setPopupVisible(false)}> {/* Overlay qui recouvre l'écran */}
          <div className="popup-window"> {/* Fenêtre popup */}
            <h3>Liste des comptes</h3>
            {/* Boucle sur les comptes pour les afficher */}
            {comptes.map((compte) => (
              <div key={compte.email} className="compte-item">
                <span>{compte.email}</span> {/* Afficher l'email */}
                <button onClick={() => handleUpdateProfile(compte.email)} className="update-button">
                  Mettre à jour
                </button>
                <button onClick={() => handleDeleteProfile(compte.email)} className="delete-button">
                  Supprimer
                </button>
              </div>
            ))}
            {/* Bouton de déconnexion */}
            <button onClick={handleLogout} className="logout-button">
              Déconnexion
            </button>
            {/* Bouton pour fermer la popup */}
            <button onClick={() => setPopupVisible(false)} className="close-button">
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
