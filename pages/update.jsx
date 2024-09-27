// pages/update.jsx
import { useState } from 'react';
import { useRouter } from 'next/router'; // Importation du hook useRouter

export default function UpdateUtilisateur() {
  const [email, setEmail] = useState(''); // Email actuel
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const router = useRouter(); // Initialisation du router

  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log("Données envoyées :", { email, newEmail, newPassword }); // Inclure l'email actuel

    try {
      const res = await fetch('/api/utilisateurs/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, newEmail, newPassword }), // Inclure l'email actuel ici
      });
      const data = await res.json();
      if (data.success) {
        alert('Mise à jour réussie');
        router.push('/connexion'); // Redirection vers la page de connexion
      } else {
        alert('Erreur lors de la mise à jour');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Mettre à jour vos informations</h1>
      <form onSubmit={handleUpdate}>
        <input
          type="email"
          placeholder="Email actuel"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Nouvel Email (optionnel)"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Nouveau Mot de Passe (optionnel)"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button type="submit">Mettre à jour</button>
      </form>
    </div>
  );
}
