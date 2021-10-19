import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Image from "next/image";

const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: "#000000",
      width: '100%',
      backgroundColor: '#FFFFFF',
      display: 'block'
    },
    button: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: "#000000",
        width: '30%',
        backgroundColor: '#F06177',
        marginTop: 30,
        marginBottom: 40
    },
  }));

export default function AppMovil() {
  const classes = useStyles();

  return (
    <>
        <div className={classes.paper}>
            <Image src="/AppMovil.png" width={400} height={400}/>
        </div>
        <div className={classes.paper}>
            <Button href="https://play.google.com/store/apps/details?id=com.fundaciones.fundacionesquito" target="_blank" variant="contained" className={classes.button}>
                Descargar aplicación móvil
            </Button>
        </div>
    </>
  );
}