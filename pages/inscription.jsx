// /pages/inscription.jsx

// import React, { useState } from 'react'; // Importation de React et du hook useState
// import axios from 'axios'; // Importation d'Axios pour les requêtes HTTP
// import { useRouter } from 'next/router'; // Importation du hook useRouter

// // Page d'inscription
// const Inscription = () => {
//     const [email, setEmail] = useState(''); // État pour stocker l'email
//     const [motDePasse, setMotDePasse] = useState(''); // État pour stocker le mot de passe
//     const router = useRouter(); // Initialise router

//     // Gestion de la soumission du formulaire
//     const handleSubmit = async (e) => {
//         e.preventDefault(); // Empêche le rechargement de la page
//         try {
//             // Envoi des données d'inscription à l'API
//             await axios.post('/api/inscription', { email, motDePasse });
//              alert('Inscription réussie'); // Affiche une alerte en cas de succès
//             router.push('/');

//         } catch (error) {
//             console.error(error); // Affiche l'erreur dans la console
//             alert('Échec de l\'inscription'); // Affiche une alerte en cas d'échec
//         }
//     };

//     return (
//         <div>
//             <h2>Inscription</h2>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="email"
//                     value={email} // Lier la valeur de l'input à l'état local
//                     onChange={(e) => setEmail(e.target.value)} // Met à jour l'état local à chaque changement
//                     placeholder="Email"
//                     required // Champ obligatoire
//                 />
//                 <input
//                     type="password"
//                     value={motDePasse} // Lier la valeur de l'input à l'état local
//                     onChange={(e) => setMotDePasse(e.target.value)} // Met à jour l'état local à chaque changement
//                     placeholder="Mot de passe"
//                     required // Champ obligatoire
//                 />
//                 <button type="submit">inscription</button> {/* Bouton pour soumettre le formulaire */}
//             </form>
//         </div>
//     );
// };

// export default Inscription; // Exportation du composant








import React, { useState } from 'react';
import axios from 'axios'; // Utilisation d'axios pour les requêtes HTTP
import { useRouter } from 'next/router';
import '../styles/auth.css'; // Import du fichier CSS
import Link from 'next/link';

const Inscription = () => {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [confirmMotDePasse, setConfirmMotDePasse] = useState('');
  const router = useRouter();

  // Gestion de la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérifie si les mots de passe correspondent
    if (motDePasse !== confirmMotDePasse) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      // Envoi des données d'inscription à l'API
      const res = await axios.post('/api/inscription', { email, motDePasse });

      if (res.data.success) {
        alert('Inscription réussie !');
        router.push('/connexion'); // Redirige vers la page de connexion après inscription
      } else {
        alert('Échec de l\'inscription');
      }
    } catch (error) {
      console.error(error);
      alert('Erreur lors de l\'inscription');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Créer votre compte</h2>
        <p>Définissez votre mot de passe pour continuer</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Adresse email*</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Entrez votre email"
              required
            />
          </div>

          {/* Champ pour le mot de passe */}
          <div className="input-group">
            <label htmlFor="password">Mot de passe*</label>
            <input
              type="password"
              id="password"
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
              placeholder="Entrez votre mot de passe"
              required
            />
          </div>

          {/* Confirmation du mot de passe */}
          <div className="input-group">
            <label htmlFor="confirm-password">Confirmez le mot de passe*</label>
            <input
              type="password"
              id="confirm-password"
              value={confirmMotDePasse}
              onChange={(e) => setConfirmMotDePasse(e.target.value)}
              placeholder="Confirmez votre mot de passe"
              required
            />
          </div>

          <button type="submit" className="btn primary-btn">
            Sinscrire
          </button>

          <p className="signup-link">
            Vous avez déjà un compte ?{" "}
            <Link href="/connexion">Connexion</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Inscription;