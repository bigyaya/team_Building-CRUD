// /pages/inscription.jsx

import React, { useState } from 'react'; // Importation de React et du hook useState
import axios from 'axios'; // Importation d'Axios pour les requêtes HTTP
import { useRouter } from 'next/router'; // Importation du hook useRouter

// Page d'inscription
const Inscription = () => {
    const [email, setEmail] = useState(''); // État pour stocker l'email
    const [motDePasse, setMotDePasse] = useState(''); // État pour stocker le mot de passe
    const router = useRouter(); // Initialise router

    // Gestion de la soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault(); // Empêche le rechargement de la page
        try {
            // Envoi des données d'inscription à l'API
            await axios.post('/api/inscription', { email, motDePasse });
             alert('Inscription réussie'); // Affiche une alerte en cas de succès
            router.push('/');

        } catch (error) {
            console.error(error); // Affiche l'erreur dans la console
            alert('Échec de l\'inscription'); // Affiche une alerte en cas d'échec
        }
    };

    return (
        <div>
            <h2>Inscription</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email} // Lier la valeur de l'input à l'état local
                    onChange={(e) => setEmail(e.target.value)} // Met à jour l'état local à chaque changement
                    placeholder="Email"
                    required // Champ obligatoire
                />
                <input
                    type="password"
                    value={motDePasse} // Lier la valeur de l'input à l'état local
                    onChange={(e) => setMotDePasse(e.target.value)} // Met à jour l'état local à chaque changement
                    placeholder="Mot de passe"
                    required // Champ obligatoire
                />
                <button type="submit">inscription</button> {/* Bouton pour soumettre le formulaire */}
            </form>
        </div>
    );
};

export default Inscription; // Exportation du composant
