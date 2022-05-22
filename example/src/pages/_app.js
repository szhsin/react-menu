import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import '../testCases/index.scss';
import Head from 'next/head';
import App from '../testCases';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>React menu component - szhsin/react-menu</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      </Head>
      <App>
        <Component {...pageProps} />
      </App>
    </>
  );
}

export default MyApp;
