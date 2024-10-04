// components/Hero.jsx
import '../styles/hero.css'; // Assurez-vous d'importer le fichier CSS
import { useRouter } from 'next/router';


export default function Hero() {
  const router = useRouter();

  return (
    <section className="hero">
      <div>
        <h1>Pour collaborer tous ensemble</h1>
        <p>Des jeux, escape games et expériences pour collaborer dans le fun.</p>
        <button onClick={() => router.push('/activity/list')}>Découvrir nos jeux</button>
        
      </div>
    </section>
  );
}
