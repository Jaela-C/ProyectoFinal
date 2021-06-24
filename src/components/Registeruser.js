import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: "#3E54E7",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  nav: {
    flexGrow: 0.05
  }
}));

export default function Registeruser() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      REGISTRAR USUARIO
    </div>
  );
}