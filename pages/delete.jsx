// pages/delete.jsx
import { useState } from 'react';
import { useRouter } from 'next/router'; // Importation du hook useRouter


export default function DeleteUtilisateur() {
  const [email, setEmail] = useState('');
  const router = useRouter(); // Initialisation du router


  const handleDelete = async (e) => {
    e.preventDefault();
    const confirmation = confirm("Es-tu sûr de vouloir supprimer ton compte ?");
    if (confirmation) {
      try {
        const res = await fetch('/api/utilisateurs/delete', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });
        const data = await res.json();
        if (data.success) {
          alert('Utilisateur supprimé');
          router.push('/connexion'); // Redirection vers la page de connexion
        } else {
          alert('Erreur lors de la suppression');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <h1>Supprimer votre compte</h1>
      <form onSubmit={handleDelete}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" style={{ backgroundColor: 'red', color: 'white' }}>
          Supprimer votre compte
        </button>
      </form>
    </div>
  );
}
