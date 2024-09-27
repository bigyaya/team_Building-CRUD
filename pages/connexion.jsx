import React, { useState } from 'react';
import axios from 'axios'; // Utilise axios pour les requêtes HTTP
import { useRouter } from 'next/router';

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
        <div>
            <h2>Connexion</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    value={motDePasse}
                    onChange={(e) => setMotDePasse(e.target.value)}
                    placeholder="Mot de passe"
                    required
                />
                <button type="submit">Se connecter</button>
            </form>
        </div>
    );
};

export default Connexion;
