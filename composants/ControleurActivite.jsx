// // /composants/ControleurActivite.js

// import React, { useState, useEffect } from 'react'; // Importation de React et des hooks useState et useEffect
// import axios from 'axios'; // Importation d'Axios pour les requêtes HTTP

// // Composant pour gérer les activités de team building
// const ControleurActivite = () => {
//     const [activites, setActivites] = useState([]); // État pour stocker les activités
//     const [nouvelleActivite, setNouvelleActivite] = useState(''); // État pour stocker la nouvelle activité

//     // Fonction pour récupérer les activités depuis l'API
//     const recupererActivites = async () => {
//         try {
//             const response = await axios.get('/api/activites');
//             setActivites(response.data.activites); // Met à jour l'état avec les activités récupérées
//         } catch (error) {
//             console.error('Erreur lors de la récupération des activités:', error);
//         }
//     };

//     // Fonction pour ajouter une nouvelle activité
//     const ajouterActivite = async () => {
//         try {
//             const response = await axios.post('/api/activites/ajouter', { nom: nouvelleActivite });
//             setActivites([...activites, response.data.activite]); // Ajoute la nouvelle activité à la liste existante
//             setNouvelleActivite(''); // Réinitialise le champ de saisie
//         } catch (error) {
//             console.error('Erreur lors de l\'ajout de l\'activité:', error);
//         }
//     };

//     // Fonction pour supprimer une activité (locale, sans API pour simplifier)
//     const supprimerActivite = (index) => {
//         const activitesMiseAJour = activites.filter((_, i) => i !== index); // Filtre l'activité à supprimer
//         setActivites(activitesMiseAJour); // Met à jour la liste des activités
//     };

//     // Utilisation de useEffect pour récupérer les activités au chargement du composant
//     useEffect(() => {
//         recupererActivites();
//     }, []);

//     return (
//         <div>
//             <h2>Composer vos activités de team building</h2>
//             <input
//                 type="text"
//                 value={nouvelleActivite} // Lier la valeur de l'input à l'état local
//                 onChange={(e) => setNouvelleActivite(e.target.value)} // Met à jour l'état local à chaque changement
//                 placeholder="Entrez une nouvelle activité"
//             />
//             <button onClick={ajouterActivite}>Ajouter Activité</button> {/* Bouton pour ajouter l'activité */}
//             <ul>
//                 {activites.map((activite, index) => (
//                     <li key={index}> {/* Affiche chaque activité dans une liste */}
//                         {activite.nom} <button onClick={() => supprimerActivite(index)}>Supprimer</button> {/* Bouton pour supprimer l'activité */}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default ControleurActivite; // Exportation du composant
