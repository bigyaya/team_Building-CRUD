// composants/Footer.jsx
import '../styles/footer.css'; // Si nécessaire

export default function Footer() {
  return (
    <footer className="footer bg-gray-900 text-white py-6">
      <div className="container mx-auto text-center">
        <p>&copy; 2024 Team Building - Tous droits réservés.</p>
        <p>Suivez-nous sur :</p>
        <div className="social-icons">
          <a href="#" className="mr-2">Facebook</a>
          <a href="#" className="mr-2">Twitter</a>
          <a href="#">Instagram</a>
        </div>
      </div>
    </footer>
  );
}
