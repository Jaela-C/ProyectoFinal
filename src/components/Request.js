import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,

  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  }, 
  input:{
      margin:2,
      width:'100%',
  },
  container:{
      textAlign: 'center',
      justifyContent: 'center',
  },
}));

export default function Request(props) {
  const classes = useStyles();
  console.log('props request', props);

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image="https://d500.epimg.net/cincodias/imagenes/2016/07/04/lifestyle/1467646262_522853_1467646344_noticia_normal.jpg"
        title="Paella dish"
      />
      <CardContent>
      <TextField
          id="filled-read-only-input"
          defaultValue={props.props.name_foundation}
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
          size="small"
          className={classes.input}
        />
        {
          props.props.rol.admin == false ? <TextField
          id="filled-read-only-input"
          defaultValue='Por aprobar'
          InputProps={{
            readOnly: true,
          }}
          size="small"
          variant="outlined"
          className={classes.input}
        /> : '...'
    }
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
            <RemoveRedEyeIcon/>
        </IconButton>
      </CardActions>
    </Card>
  );
}