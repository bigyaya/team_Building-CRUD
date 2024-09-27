import '../styles/globals.css';

function MonApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
  
  
}

export default MonApp;

export async function getServerSideProps() {
  return { props: {} };
}