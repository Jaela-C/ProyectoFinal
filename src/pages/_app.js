import "@/styles/globals.css";
import MainMenu from "@/components/Nav";
import Footer from "@/components/Footer";
import MediaCard from '@/components/Carousel';
import CardInformation from '@/components/CardInformation'
import InformationAdmin from '@/components/InformationAdmin'
import InformationUser from '@/components/InformationUser'
import AppMovil from '@/components/AppMovil'
import Head from "next/head";
import {ThemeProvider } from "@material-ui/core";
import theme from "./theme";

function App({ Component, pageProps }) {
  return (
    <>
        <Head>
          <title>Proyecto Final</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>

        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <MainMenu />
          <MediaCard></MediaCard>
          <CardInformation></CardInformation>
          <InformationAdmin></InformationAdmin>
          <MediaCard></MediaCard>
          <InformationUser></InformationUser>
          <AppMovil></AppMovil>
          <Component {...pageProps} />
          <Footer />
        </ThemeProvider>
    </>
  );
}

export default App;