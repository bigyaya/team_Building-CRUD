// components/Header.jsx
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import '../styles/navbar.css'; // Import des styles CSS

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    router.push('/');
  };

  return (
    <header className="navbar">
      <div className="navbar-logo">
        {/* Image du logo avec Next.js */}
        <Link href="/">
          <Image
            src="/teambuldingLogo.jpg"
            alt="Logo Team Building"
            width={60}
            height={60}
            className="cursor-pointer"
          />
        </Link>
      </div>

      <nav className="navbar-links">
        <Link href="/">Accueil</Link>
        <Link href="/nos-jeux">Nos Jeux</Link>
        <Link href="/a-propos">À propos</Link>
        <Link href="/contact">Contact</Link>
      </nav>

      <div className="navbar-buttons">
        {isLoggedIn ? (
          <>
            <button onClick={() => router.push('/profile')} className="login">
              Profil
            </button>
            <button onClick={handleLogout} className="signup">
              Déconnexion
            </button>
          </>
        ) : (
          <>
            <button onClick={() => router.push('/connexion')} className="login">
              Connexion
            </button>
            <button onClick={() => router.push('/inscription')} className="signup">
              Inscription
            </button>
          </>
        )}
      </div>
    </header>
  );
}
