import { useState } from 'react';
import { useRouter } from 'next/router';

export default function ProfilPage() {
  const [email, setEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const router = useRouter();

  // Fonction pour mettre à jour les informations de l'utilisateur
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/utilisateurs/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, newEmail, newPassword }),
      });

      const data = await res.json();
      if (data.success) {
        alert('Mise à jour réussie');
        router.push('/'); // Redirection après mise à jour réussie
      } else {
        alert('Erreur lors de la mise à jour');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de la mise à jour');
    }
  };

  // Fonction pour supprimer le compte de l'utilisateur avec confirmation
  const handleDelete = async () => {
    // Avertissement avant suppression
    const confirmation = confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.');

    if (confirmation) {
      // Si l'utilisateur confirme, on procède à la suppression
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
          alert('Compte supprimé avec succès');
          router.push('/'); // Redirection après suppression réussie
        } else {
          alert('Erreur lors de la suppression');
        }
      } catch (error) {
        console.error('Erreur:', error);
        alert('Erreur lors de la suppression');
      }
    } else {
      // Si l'utilisateur annule, on ne fait rien
      alert('Suppression annulée');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">Mon Profil</h2>
        <p className="sub-text">Modifiez votre email ou mot de passe ici</p>

        <form onSubmit={handleUpdate}>
          <div className="input-group">
            <label htmlFor="email">Email actuel</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Entrez votre email actuel"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="newEmail">Nouveau Email (optionnel)</label>
            <input
              type="email"
              id="newEmail"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="Entrez un nouvel email"
            />
          </div>

          <div className="input-group">
            <label htmlFor="newPassword">Nouveau Mot de Passe (optionnel)</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Entrez un nouveau mot de passe"
            />
          </div>

          <button type="submit" className="btn primary-btn">Mettre à jour</button>
        </form>

        <button onClick={handleDelete} className="btn secondary-btn">
          Supprimer mon compte
        </button>
      </div>
    </div>
  );
}
