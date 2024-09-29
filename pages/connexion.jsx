// import React, { useState } from 'react';
// import axios from 'axios'; // Utilise axios pour les requêtes HTTP
// import { useRouter } from 'next/router';

// const Connexion = () => {
//     const [email, setEmail] = useState('');
//     const [motDePasse, setMotDePasse] = useState('');
//     const router = useRouter(); // Utilise le hook router pour rediriger

//     // Gestion de la soumission du formulaire
//     const handleSubmit = async (e) => {
//         e.preventDefault(); // Empêche le rechargement de la page
//         try {
//             // Envoi des données de connexion à l'API
//             const res = await axios.post('/api/connexion', { email, motDePasse });
            
//             // En cas de succès, stockage du token JWT dans localStorage
//             if (res.data.success) {
//                 localStorage.setItem('token', res.data.token); // Stocke le token JWT
//                 router.push('/'); // Redirige vers la page d'accueil
//             } else {
//                 alert('Échec de la connexion'); // Affiche une alerte en cas d'échec
//             }
//         } catch (error) {
//             console.error(error); // Affiche l'erreur dans la console
//             alert('Échec de la connexion'); // Affiche une alerte en cas d'échec
//         }
//     };

//     return (
//         <div>
//             <h2>Connexion</h2>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     placeholder="Email"
//                     required
//                 />
//                 <input
//                     type="password"
//                     value={motDePasse}
//                     onChange={(e) => setMotDePasse(e.target.value)}
//                     placeholder="Mot de passe"
//                     required
//                 />
//                 <button type="submit">Se connecter</button>
//             </form>
//         </div>
//     );
// };

// export default Connexion;






import React, { useState } from 'react';
import axios from 'axios'; // Utilisation d'axios pour les requêtes HTTP
import { useRouter } from 'next/router';
import '../styles/auth.css'; // Import du fichier CSS
import Link from 'next/link';

const Connexion = () => {
    const [email, setEmail] = useState('');
    const [motDePasse, setMotDePasse] = useState('');
    const router = useRouter(); // Utilise le hook router pour rediriger

    // Gestion de la soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault(); // Empêche le rechargement de la page
        try {
            // Envoi des données de connexion à l'API
            const res = await axios.post('/api/connexion', { email, motDePasse });
            
            // En cas de succès, stockage du token JWT dans localStorage
            if (res.data.success) {
                localStorage.setItem('token', res.data.token); // Stocke le token JWT
                router.push('/'); // Redirige vers la page d'accueil
            } else {
                alert('Échec de la connexion'); // Affiche une alerte en cas d'échec
            }
        } catch (error) {
            console.error(error); // Affiche l'erreur dans la console
            alert('Échec de la connexion'); // Affiche une alerte en cas d'échec
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>Bienvenue</h2>
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

                    <button type="submit" className="btn primary-btn">
                        Se connecter
                    </button>

                    <p className="signup-link">
                        Vous navez pas de compte ?{" "}
                        <Link href="/inscription">
                            Inscription
                        </Link>
                    </p>

                    <div className="divider">ou</div>

                    <button type="button" className="btn secondary-btn">
                        Continuer avec Google
                    </button>
                    <button type="button" className="btn secondary-btn">
                        Continuer avec le compte Microsoft
                    </button>
                    <button type="button" className="btn secondary-btn">
                        Continuer avec Apple
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Connexion;

