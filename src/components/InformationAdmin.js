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
import Routes from "../constants/routes";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '15px',
    textAlign: 'center',
    color: "#000000",
    width: '100%',
    backgroundColor: '#3E54E7',
    marginTop: 30
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

export default function InformationAdmin() {
    const classes = useStyles();
  
    return (
      <div>
            <Paper className={classes.paper}>
              <Typography variant="h2" className={classes.paperTitle} >
              FUNDACIONES
              </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm container spacing={2} className={classes.container}>
                    <Grid item xs={4}>
                      <Card>
                              <CardContent>
                              <CardMedia
                              className={classes.media}
                              image="/Profile.png"
                              title="Modificar perfil"
                              />
                              <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
                                  Modificar perfil
                              </Typography>
                              <Typography variant="body2" color="textSecondary" component="p">
                                  - Puedes modificar tu información personal a excepción del rol que obtienes al registrarte en el sitio web o aplicación móvil
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
                              image="/Reactions.png"
                              title="Publicar información"
                              />
                              <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
                                  Publicar información
                              </Typography>
                              <Typography variant="body2" color="textSecondary" component="p">
                                  - Puedes agregar o eliminar una publicación
                              </Typography>
                              <Typography variant="body2" color="textSecondary" component="p">
                                  - Puedes modificar los datos de una publicación
                              </Typography>
                              <Typography variant="body2" color="textSecondary" component="p">
                                  - Puedes agregar una imagen a tus publicaciones
                              </Typography>
                              <Typography variant="body2" color="textSecondary" component="p">
                                  - Tus necesidades tendrán un mayor alcance
                              </Typography>
                              </CardContent>
                      </Card>
                  </Grid>
                  <Grid item xs={4}>
                      <Card>
                              <CardContent>
                              <CardMedia
                              className={classes.media}
                              image="/User.png"
                              title="Comentar pubicaciones"
                              />
                              <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
                                  Comunicarse con el usuario
                              </Typography>
                              <Typography variant="body2" color="textSecondary" component="p">
                                  - Puedes realizar y responder comentarios que estén disponibles en tus publicaciones
                              </Typography>
                              <Typography variant="body2" color="textSecondary" component="p">
                                  - Puedes comunicarte directamente con las personas que estén interesadas en ayudar
                              </Typography>
                              </CardContent>
                      </Card>
                  </Grid>
                </Grid>
              </Grid>
              <Typography className={classes.condiciones}>
                *Debe subir un respaldo que compruebe que la cuenta le pertenece a una entidad sin fines de lucro.
              </Typography>
              <Button variant="contained" className={classes.button} href={Routes.REGISTERADMIN}>
                Crear cuenta 
              </Button>
            </Paper>
      </div>
    );
}