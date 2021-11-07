import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: "#000000",
    width: '100%',
    backgroundColor: '#3E54E7',
  },
  paperTitle: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: "#FFFFFF",
    width: '100%',
    backgroundColor: '#3E54E7',
    marginTop: 30,
    fontWeight: "bold",
  },
  media: {
    height: 400,
  },
  container: {
    marginTop: 60,
    display: "flex",
    color: "#FFFFFF"
  },
  title: {
    textAlign: "center"
  },
  button: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: "#000000",
    width: '50%',
    backgroundColor: '#F06177',
    marginTop: 30,
    marginBottom: 40
  },
  condiciones: {
    marginBottom: 5,
    marginTop: 30,
    color: "#FFFFFF",
    variant: "h6",
    textAlign: 'left',
  }
}));

export default function InformationUser() {
    const classes = useStyles();
  
    return (
      <div>
        <Grid container>
          <Grid container item xs={12} >
            <Paper className={classes.paper}>
              <Typography variant="h2" className={classes.paperTitle} >
              USUARIO
              </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm container spacing={2} className={classes.container}>
                    <Grid item xs={4}>
                      <Card>
                              <CardContent>
                              <CardMedia
                              className={classes.media}
                              image="/Profile2.png"
                              title="Modificar perfil"
                              />
                              <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
                                  Modificar perfil
                              </Typography>
                              <Typography variant="body2" color="textSecondary" component="p">
                                  - Puedes modificar tu información personal a excepción del rol que obtienes al registrarte
                              </Typography>
                              <Typography variant="body2" color="textSecondary" component="p">
                                  - Puedes agregar una foto de perfil
                              </Typography>
                              </CardContent>
                      </Card>
                  </Grid>
                  <Grid item xs={4}>
                      <Card>
                              <CardContent>
                              <CardMedia
                              className={classes.media}
                              image="/Coment.png"
                              title="Ver y comentar publicaciones"
                              />
                              <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
                                  Ver y Comentar Publicaciones
                              </Typography>
                              <Typography variant="body2" color="textSecondary" component="p">
                                  - Puedes comentar las publicaciones
                              </Typography>
                              <Typography variant="body2" color="textSecondary" component="p">
                                  - Puedes ver toda la información que haya sido publicada por cualquier fundación
                              </Typography>
                              </CardContent>
                      </Card>
                  </Grid>
                  <Grid item xs={4}>
                      <Card>
                              <CardContent>
                              <CardMedia
                              className={classes.media}
                              image="/Talk.png"
                              title="Comentanicarse con la fundación"
                              />
                              <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
                                  Comunicarse con la fundación
                              </Typography>
                              <Typography variant="body2" color="textSecondary" component="p">
                                  - La comunicación es segura
                              </Typography>
                              <Typography variant="body2" color="textSecondary" component="p">
                                  - Puedes comunicarte directamente con la persona encargada de la fundación
                              </Typography>
                              </CardContent>
                      </Card>
                  </Grid>
                </Grid>
              </Grid>
              <Button variant="contained" className={classes.button} href="/registeruser">
                Crear cuenta
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
}