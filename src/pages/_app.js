import "@/styles/globals.css";
import MainMenu from "@/components/Nav";
import Footer from "@/components/Footer";
import Head from "next/head";
import {ThemeProvider } from "@material-ui/core";
import theme from "./theme";
import { AuthProvider } from '../hocs/useAuth';

function App({ Component, pageProps }) {
  return (
    <>
      <AuthProvider>
        <Head>
          <title>Quito Acolita</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>

        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <MainMenu />
            <Component {...pageProps} />
          <Footer />
        </ThemeProvider>
      </AuthProvider>
    </>
  );
}

export default App;