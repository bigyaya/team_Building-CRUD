// import '../styles/globals.css';
import '../styles/navbar.css'
import '../styles/footer.css'
import Header from '../composants/Header';
import Footer from '../composants/footer';

function MonApp({ Component, pageProps }) {
  return (
    <div>
      <Header /> {/* Header visible sur toutes les pages */}
      <main>
        <Component {...pageProps} /> {/* Contenu spécifique à chaque page */}
      </main>
      <Footer /> {/* Footer visible sur toutes les pages */}
    </div>
  );
  
  
}

export default MonApp;

export async function getServerSideProps() {
  return { props: {} };
}