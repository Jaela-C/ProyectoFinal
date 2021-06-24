import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import { Box } from "@material-ui/core";
import Socialmedia from "@/components/Socialmedia";
import Divider from "@material-ui/core/Divider";

function Copyright() {
  return (
    <Typography variant="body2" align="center">
       {"Copyright © "} Ecuador | Todos los derechos reservados
      <Link href="https://material-ui.com/">{''}</Link>{new Date().getFullYear()}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(7, 0),
    backgroundColor: "#3E54E7",
    color: "#FFFFFF",
    width: "100%"
  },
  root: {
    flexGrow: 1,
    display: "flex",
    alignContent: "center",
    width: '100%'
  },
  paper: {
    padding: theme.spacing(2),
    alignItems: "center",
    alignContent: "right",
  }
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.footer}>
      <Grid
        container
        direction="column"
        justify="space-around"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          <Box>
            <Socialmedia />
          </Box>
        </Grid>
      </Grid>
      <Divider style={{ background: "#FFFFFF" }} />
      <Container maxWidth="lg">
        <Copyright />
      </Container>
    </div>
  );
}