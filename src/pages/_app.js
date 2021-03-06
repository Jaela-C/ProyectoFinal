import "@/styles/globals.css";
import MainMenu from "@/components/Nav";
import Footer from "@/components/Footer";
import Head from "next/head";
import {ThemeProvider } from "@material-ui/core";
import theme from "../styles/theme";
import { AuthProvider } from '../hocs/useAuth';
import { SnackbarProvider } from 'notistack';

function App({ Component, pageProps }) {
  return (
    <>
    <SnackbarProvider maxSnack={3}>
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
            {/* <Switch>
              <Route path='/login' render={() => {
                <Login/>
              }}

              />
            </Switch> */}
          <Footer />
        </ThemeProvider>
      </AuthProvider>
      </SnackbarProvider>
    </>
  );
}

export default App;