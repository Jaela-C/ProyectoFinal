import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  media: {
    height: 300,
    margin: 10,
  },
  container: {
    marginTop: 60,
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 60
  },
  title: {
    textAlign: "center"
  },
  card:{
    maxHeight: '330 px',
  }
}));

export default function NestedGrid() {
    const classes = useStyles();
  
    return (
      <div className={classes.container}>
        <Grid container>
          <Grid container item xs={12} spacing={2}>
            <Grid item xs={4}>
                <Card className={classes.root}>
                        <CardContent className={classes.card}>
                        <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
                            Brindar ayuda
                        </Typography>
                        <CardMedia
                        className={classes.media}
                        image="/Comuni.png"
                        title="Brindar ayuda"
                        />
                        <Typography variant="body2" color="textSecondary" component="p">
                            Las fundaciones de la ciudad de Quito necesitan la colaboración de todos los ciudadanos para seguir brindando ayuda a las personas de bajos recursos. 
                        </Typography>
                        </CardContent>
                </Card>
            </Grid>
            <Grid item xs={4}>
                <Card className={classes.root}>
                        <CardContent className={classes.card}>
                        <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
                            Comunicarse con una fundación
                        </Typography>
                        <CardMedia
                        className={classes.media}
                        image="/ChatUsers.png"
                        title="Comunicarse con una fundación"
                        />
                        <Typography variant="body2" color="textSecondary" component="p">
                            Si decides ayudar a una fundación, puedes realizar comentarios para pedir información o comunicarte directamente por medio de mensajes. 
                        </Typography>
                        </CardContent>
                </Card>
            </Grid>
            <Grid item xs={4}>
                <Card className={classes.root}>
                        <CardContent className={classes.card}>
                        <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
                            Publicaciones
                        </Typography>
                        <CardMedia
                        className={classes.media}
                        image="/ViewPublication.png"
                        title="Publicaciones"
                        />
                        <Typography variant="body2" color="textSecondary" component="p">
                            Las fundaciones publican sus principales necesidades, las cuales pueden ser atendidas por cualquier persona en cualquier momento.
                        </Typography>
                        </CardContent>
                </Card>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
}