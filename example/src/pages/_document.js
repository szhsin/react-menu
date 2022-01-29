import Document, { Html, Head, Main, NextScript } from 'next/document';
import { basePath } from '../../next.config';
import { bem } from '../utils';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta
            name="description"
            content="React components for building accessible menu, dropdown, submenu, context menu, tooltip, and more."
          />
          <meta name="theme-color" content="#000000" />
          <link rel="shortcut icon" href={`${basePath}/favicon.ico`} />
          <link rel="manifest" href={`${basePath}/manifest.json`} />
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        </Head>
        <body className={bem('szh-app', null, { theme: 'dark' })}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
