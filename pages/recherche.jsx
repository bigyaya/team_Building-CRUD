import { useRouter } from 'next/router';
import { useState } from 'react';

export default function RecherchePage() {
  const router = useRouter();
  const { location, theme, date, nbPersonnes } = router.query;

  // Ici, tu peux appeler une API pour obtenir les résultats basés sur ces paramètres
  return (
    <div>
      <h1>Résultats de la recherche</h1>
      <p>Lieu : {location}</p>
      <p>Thème : {theme}</p>
      <p>Date : {date}</p>
      <p>Nombre de personnes : {nbPersonnes}</p>

      {/* Tu peux afficher les résultats ici */}
    </div>
  );
}
