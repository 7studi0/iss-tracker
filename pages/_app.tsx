import { AppProps } from 'next/app';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../styles/theme';
import Head from 'next/head';

// import * as Cesium from 'cesium';
// Cesium.Ion.defaultAccessToken = process.env.CECIUM_ACCESS_TOKEN || '';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>ISS Tracker</title>
        <meta
          name='description'
          content='Track the location of the International Space Station'
        />
        <link rel='icon' href='/favicon.ico' />
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link rel='stylesheet' href='cesium/Widgets/widgets.css' />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
